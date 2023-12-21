import {
  Accidental,
  Font,
  FontStyle,
  FontWeight,
  Formatter,
  KeyManager,
  RenderContext,
  Renderer,
  Stave,
  StaveNote,
  TabNote,
  TabStave,
  TextFormatter,
  Tuning,
} from "vexflow";

const option = [
  "staveType",
  "notation",
  "tablature",
  "clef",
  "key",
  "time",
] as const;
type Option = (typeof option)[number];

type Options = {
  [prop in Option]: any;
};

const isOption = (x: any): x is Option => option.includes(x);

type StavePair = [TabStave | null, Stave | null];
type GenericNote = { note: string; place: string };

export class Compiler {
  div: HTMLDivElement;
  renderer: Renderer;
  ctx: RenderContext;
  margin: number;
  staveWidth: number;
  currPos: number;
  tuning: Tuning;

  constructor(ref: HTMLDivElement) {
    this.div = ref;
    this.renderer = new Renderer(ref, Renderer.Backends.SVG);
    this.ctx = this.renderer.getContext();
    this.renderer.resize(ref.offsetWidth, ref.offsetHeight);
    this.margin = 50;
    this.staveWidth = ref.offsetWidth - this.margin * 2;
    this.currPos = 0;
    this.tuning = new Tuning();
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
    let opts = {
      notation: false,
      tablature: true,
      clef: "treble",
      key: "C",
      time: "C",
    } as Options;

    optString.split(/\s/).forEach((pair) => {
      const [prop, value] = pair.split("=");
      if (isOption(prop)) {
        opts[prop] = value;
      }
    });

    if (!/(C|C\||[0-9]+\/[0-9]+)/.test(opts.time)) {
      throw new Error("Invalid time signature");
    }

    return opts;
  }

  setStavePos(stave: Stave) {
    if (!stave) return;
    stave.setY(this.currPos);
    stave.setContext(this.ctx);
    this.currPos += stave.getBoundingBox().h;
  }

  createStaveNote(
    note: string,
    place: string,
    opts: Options,
    keyManager: KeyManager,
  ) {
    let staveNote;

    if (/^[A-G]+[#bn]?$/.test(note)) {
      staveNote = new StaveNote({
        keys: [`${note}/${place}`],
        duration: "q",
      });

      if (note.length === 2) {
        staveNote.addModifier(new Accidental(note[1]));
      }
    } else {
      const [absNote, octave] = this.tuning
        .getNoteForFret(note, place)
        .split("/");
      const keyNote = keyManager.selectNote(absNote);

      staveNote = new StaveNote({
        keys: [`${keyNote.note}/${octave}`],
        duration: "q",
        clef: opts.clef,
        auto_stem: true,
      });

      if (keyNote.accidental) {
        staveNote.addModifier(new Accidental(keyNote.accidental));
      }
    }

    return staveNote;
  }

  createTabNote(note: string, place: string) {
    const tabNote = new TabNote({
      positions: [
        {
          str: parseInt(place),
          fret: /^[0-9]+$/.test(note) ? note : "x",
        },
      ],
      duration: "q",
    });

    return tabNote;
  }

  createNoteObjects(
    notes: GenericNote[],
    opts: Options,
    override?: "stave" | "tabstave",
  ) {
    const noteObjects: TabNote[] & StaveNote[] = [];

    if ((!override && opts.staveType === "stave") || override === "stave") {
      const keyManager = new KeyManager(opts.key);
      for (const note of notes) {
        noteObjects.push(
          this.createStaveNote(note.note, note.place, opts, keyManager),
        );
      }
    } else if (
      (!override && opts.staveType === "tabstave") ||
      override === "tabstave"
    ) {
      for (const note of notes) {
        noteObjects.push(this.createTabNote(note.note, note.place));
      }
    }

    return noteObjects;
  }

  drawNotesOnStave(
    notes: GenericNote[],
    stave: Stave | TabStave,
    opts: Options,
  ) {
    const noteObjects = this.createNoteObjects(notes, opts);
    Formatter.FormatAndDraw(this.ctx, stave, noteObjects);
  }

  drawNotesOnStavePair(
    notes: GenericNote[],
    tabstave: TabStave,
    stave: Stave,
    opts: Options,
  ) {
    const tabNoteObjects = this.createNoteObjects(notes, opts, "tabstave");
    const noteObjects = this.createNoteObjects(notes, opts, "stave");
    tabstave.setNoteStartX(stave.getNoteStartX());

    Formatter.FormatAndDrawTab(
      this.ctx,
      tabstave,
      stave,
      tabNoteObjects,
      noteObjects,
      true,
      {},
    );
  }

  parse(notation: string) {
    if (this.div.childNodes.length > 1 && this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }

    const lines = notation.split(/\r?\n/);
    let tabstave = null;
    let keystave = null;
    let opts = {} as Options;
    let notes;

    for (const line of lines) {
      if (line[0] === "#") continue;

      const spaceIndex = line.indexOf(" ");
      const rest = line.substring(spaceIndex + 1).trim();
      let keyword;

      if (spaceIndex === -1) {
        keyword = line;
      } else {
        keyword = line.substring(0, spaceIndex);
      }

      try {
        if (keyword === "stave" || keyword === "tabstave") {
          opts = this.getOpts(rest);
          opts.staveType = keyword;
          [tabstave, keystave] = this.parseStave(opts);
          keystave && keystave.draw();
          tabstave && tabstave.draw();
        } else if (keyword === "notes") {
          notes = this.parseNotes(rest);
          if (tabstave && keystave) {
            this.drawNotesOnStavePair(notes, tabstave, keystave, opts);
          } else if (tabstave) {
            this.drawNotesOnStave(notes, tabstave, opts);
          } else if (keystave) {
            this.drawNotesOnStave(notes, keystave, opts);
          }
        }
      } catch (e) {
        console.log((e as Error).message);
      }
    }
  }

  parseStave(opts: Options): StavePair {
    let tabstave: TabStave | null = null;
    let keystave: Stave | null = null;

    if (opts.staveType === "tabstave" || opts.tablature === "true") {
      tabstave = new TabStave(this.margin, 0, this.staveWidth).addClef("tab");
    }

    if (opts.staveType === "stave" || opts.notation === "true") {
      keystave = new Stave(this.margin, 0, this.staveWidth);
      try {
        keystave
          .addClef(opts.clef)
          .addKeySignature(opts.key)
          .addTimeSignature(opts.time);
      } catch (e) {
        console.log(e);
      }
    }

    if (keystave && tabstave) {
      this.setStavePos(keystave);
      this.currPos -= 50;
      this.setStavePos(tabstave);
    } else if (keystave) {
      this.setStavePos(keystave);
    } else if (tabstave) {
      this.setStavePos(tabstave);
    }

    return [tabstave, keystave];
  }

  parseNotes(line: string) {
    const tokens = line.split(" ");
    const notes = [];

    for (const token of tokens) {
      switch (token[0]) {
        case "(":
          break;
        case "#":
          break;
        case ":":
          break;
        case "^":
          break;
        case "|":
          break;
        default:
          notes.push(...this.parsePlainNotes(token));
      }
    }

    return notes;
  }

  parsePlainNotes(token: string): GenericNote[] {
    const [neighbourNotes, place] = token.split("/");
    const tiedNotes = neighbourNotes.split("-");
    const notes = [];

    for (const tiedNote of tiedNotes) {
      const pureNotes = tiedNote.split(/[hbpts]/);

      for (const pureNote of pureNotes) {
        notes.push({
          note: pureNote,
          place: place,
        });
      }
    }

    return notes;
  }
}
