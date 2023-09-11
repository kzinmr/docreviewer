declare module 'docxyz' {
  export class Document {
    constructor(content: ArrayBuffer);
    paragraphs: Array<Paragraph>;
    add_paragraph(text: string): void;
    save(saveTo: string): void;
  }
  export class Paragraph {
    constructor(text: string);
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _element: any;
    insert_paragraph_before(text: string): Paragraph;
  }
}
