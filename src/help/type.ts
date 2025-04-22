export type TBook = {
  id: number;
  image: string;
  title: string;
  author: string;
  genre: string;
  date: string;
  chapter: TChapter[];
};
export type TChapter = {
  title: string;
  content: string;
};

export type TData = {
  id: number;
  book: TBook;
  updateBook: boolean;
  modal: boolean;
  modalDelete: boolean;
};
