import {
  RenderContext,
  Renderer,
  Stave,
  StaveConnector,
  TabStave,
} from "vexflow";

export class Tabber {
  container: HTMLDivElement;
  renderer: Renderer;
  ctx: RenderContext;
  margin: number;
  pairOffset: number;
  staveOffset: number;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.renderer = new Renderer(this.container, Renderer.Backends.SVG);
    this.renderer.resize(
      this.container.offsetWidth,
      this.container.offsetHeight,
    );
    this.ctx = this.renderer.getContext();

    this.margin = 20;
    this.pairOffset = 20;
    this.staveOffset = 50;
  }

  render(tab: string) {
    const stavesStr = tab.split(/(?:\r?\n){2}/);
    const staveX = this.margin;
    const staveY = 0;
    const staveWidth = this.container.offsetWidth - this.margin * 2;

    let staveOffset = 0;

    for (let staveStr of stavesStr) {
      const [metadataStr, ...data] = staveStr.split(/\r?\n/);
      const [staveType, ...metadataArr] = metadataStr.split(" ");

      if (staveType !== "stave" && staveType !== "tabstave") {
        console.log("unknown stave type");
        return;
      }

      const metadata: any = {
        notation: false,
        tab: true,
        clef: "treble",
        key: "C",
        time: undefined,
        tuning: "standard",
      };

      for (let data of metadataArr) {
        const [prop, value] = data.split("=");

        switch (prop) {
          case "notation":
            if (/true|false/.test(value)) {
              metadata.notation = value === "true";
            }
            break;
          case "tab":
            if (/true|false/.test(value)) {
              metadata.tab = value === "true";
            }
            break;
          case "clef":
            if (/treble|alto|tenor|bass|percussion/.test(value)) {
              metadata.clef = value;
            }
            break;
          case "key":
            if (/[A-G][#b]?[bm]?/.test(value)) {
              metadata.key = value;
            }
            break;
          case "time":
            if (/C[|]?|#\/#/.test(value)) {
              metadata.time = value;
            }
            break;
          case "tuning":
            if (/standard|dropd|eb|E\/5|[BGD]\/4|[AE]\/3/.test(value)) {
              metadata.tuning = value;
            }
            break;
        }
      }

      let stave;
      let tabstave;
      let pairOffset = 0;

      if (staveType === "stave" || metadata.notation === true) {
        stave = new Stave(staveX, staveY + staveOffset, staveWidth);
        stave.addClef("treble");
        pairOffset = stave.getHeight() / 2 + this.pairOffset;
      }

      if (staveType === "tabstave" || metadata.tab === true) {
        tabstave = new TabStave(
          staveX,
          staveY + staveOffset + pairOffset,
          staveWidth,
        );
        tabstave.addClef("tab");
      }

      tabstave && tabstave.setContext(this.ctx).draw();
      stave && stave.setContext(this.ctx).draw();

      if (stave && tabstave) {
        const line = new StaveConnector(stave, tabstave);
        line.setType(StaveConnector.type.SINGLE);
        line.setContext(this.ctx);
        line.draw();
      }

      staveOffset += this.staveOffset + this.pairOffset;
      if (stave) staveOffset += stave.getHeight() / 2;
      if (tabstave) staveOffset += tabstave.getHeight() / 2;
    }
  }

  load(tab: string) {
    if (this.container.childNodes.length > 1 && this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.render(tab);
  }
}
