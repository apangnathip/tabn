import {
  Font,
  FontStyle,
  FontWeight,
  RenderContext,
  Renderer,
  Stave,
  StaveConnector,
  TabStave,
  TextFormatter,
} from "vexflow";

const option = ["notation", "tablature", "clef", "key", "time"] as const;
type Option = (typeof option)[number];

type Options = {
  [prop in Option]: any;
};

type StaveType = "tab" | "note";

const isOption = (x: any): x is Option => option.includes(x);

export class Compiler {
  div: HTMLDivElement;
  renderer: Renderer;
  ctx: RenderContext;
  margin: number;
  staveWidth: number;
  currPos: number;

  constructor(ref: HTMLDivElement) {
    this.div = ref;
    this.renderer = new Renderer(ref, Renderer.Backends.SVG);
    this.ctx = this.renderer.getContext();
    this.renderer.resize(ref.offsetWidth, ref.offsetHeight);
    this.margin = 50;
    this.staveWidth = ref.offsetWidth - this.margin * 2;
    this.currPos = 0;
  }

  parse(notation: string) {
    if (this.div.childNodes.length > 1 && this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }

    const lines = notation.split(/\r?\n/);
    let currStaves: (Stave | null)[];

    for (const line of lines) {
      if (line[0] === "#") continue;

      const spaceIndex = line.indexOf(" ");
      const keyword = line.substring(0, spaceIndex);
      const rest = line.substring(spaceIndex + 1);

      try {
        switch (keyword) {
          case "stave":
            currStaves = this.parseStave(rest, "note");
            this.drawStaves(currStaves);
            break;
          case "tabstave":
            currStaves = this.parseStave(rest, "tab");
            this.drawStaves(currStaves);
            break;
          case "notes":
            this.parseNotes(rest);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  setTitle(title: string) {
    const font = {
      family: Font.SERIF,
      size: 24,
      weight: FontWeight.NORMAL,
      style: FontStyle.NORMAL,
    };
    const padding = 50;
    const textFormatter = TextFormatter.create(font);
    const textY = textFormatter.getYForStringInPx(title);
    const width = textFormatter.getWidthForTextInPx(title);
    const height = textY.height;
    this.ctx.setFont(font);
    this.ctx.fillText(
      title,
      this.div.offsetWidth / 2 - width / 2,
      this.margin + padding,
    );
    this.currPos += height + 2 * padding;
  }

  getOpts(optString: string) {
    let opts = {} as Options;

    optString.split(/\s/).forEach((pair) => {
      const [prop, value] = pair.split("=");
      if (isOption(prop)) {
        opts[prop] = value;
      }
    });

    return opts;
  }

  setStavePos(stave: Stave) {
    if (!stave) return;
    stave.setY(this.currPos);
    stave.setContext(this.ctx);
    this.currPos += stave.getBoundingBox().h;
  }

  parseStave(line: string, type: StaveType, globalOpts = null) {
    const opts = globalOpts ?? this.getOpts(line);
    let tabstave = null;
    let notestave = null;

    if (type === "tab" || opts.tablature === "true") {
      tabstave = new TabStave(this.margin, 0, this.staveWidth).addClef("tab");
    }

    if (type === "note" || opts.notation === "true") {
      notestave = new Stave(this.margin, 0, this.staveWidth);
      try {
        notestave
          .addClef(opts.clef)
          .addKeySignature(opts.key)
          .addTimeSignature(opts.time);
      } catch (e) {
        console.log(e);
      }
    }

    if (notestave && tabstave) {
      this.setStavePos(notestave);
      this.currPos -= 50;
      this.setStavePos(tabstave);

      const connector = new StaveConnector(notestave, tabstave);
      connector.setType(StaveConnector.type.SINGLE);
      connector.setContext(this.ctx);
      connector.draw();
    } else if (notestave) {
      this.setStavePos(notestave);
    } else if (tabstave) {
      this.setStavePos(tabstave);
    }

    return [notestave, tabstave];
  }

  drawStaves(staves: (Stave | null)[]) {
    for (const stave of staves) {
      stave?.draw();
    }
  }

  parseNotes(line: string) {
    console.log(line);
  }
}
