import { TBook } from "@/fetchApi/type";

export type TChapter = {
  chapter: string;
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
  img: string;
  name: string;
  date: string;
  description: string;
};
