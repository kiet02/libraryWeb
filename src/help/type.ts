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
export type TCategory = {
  id: number;
  name: string;
  description: string;
};
export type TUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  date: string;
};
export type TAuthor = {
  id: number;
  image: string;
  name: string;
  bio: string;
  date: string;
  description: string;
};
