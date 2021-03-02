import { action, observable } from "mobx";
import { Id } from "../models/Global";
import { mockParagraphs } from "../mockData/aboutUs";
import { createContext } from "react";

export type TParagraph = {
  id: Id;
  title?: string;
  content: string;
};

export class Paragraph {
  @observable
  id: Id;

  @observable
  title?: string;

  @observable
  content: string;

  constructor(info: TParagraph) {
    this.id = info.id;
    this.title = info.title;
    this.content = info.content;
  }
}

export type TParagraphCreate = Omit<TParagraph, "id">;

export class ParagraphStore {
  @observable
  private paragraphs: Paragraph[] = [];

  getParagraph() {
    return this.paragraphs;
  }

  @action
  createParagraph(p: TParagraphCreate) {
    this.paragraphs = [
      ...this.paragraphs,
      new Paragraph({
        ...p,
        id: `${new Date()}${this.paragraphs.length}`,
      }),
    ];
  }

  @action
  updateParagraph(p: TParagraph) {
    this.paragraphs = this.paragraphs.map((paragraph) =>
      paragraph.id === p.id ? p : paragraph
    );
  }

  constructor() {
    this.createParagraph({
      title: "We are here",
      content: mockParagraphs[0],
    });

    this.createParagraph({
      content: mockParagraphs[1],
    });

    this.createParagraph({
      content: mockParagraphs[2],
    });

    this.createParagraph({
      title: "Last Paragraph",
      content: mockParagraphs[3],
    });
  }
}

const paragraphStore = new ParagraphStore();
export const ParagraphStoreContext = createContext(paragraphStore);
export const ParagraphStoreProvider: React.FC<{}> = ({ children }) => (
  <ParagraphStoreContext.Provider value={paragraphStore}>
    {children}
  </ParagraphStoreContext.Provider>
);
