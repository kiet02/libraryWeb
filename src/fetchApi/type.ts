export type TProfileResponse = {
  avatar: string;
  avatar_path: null | string;
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: null | string;
  include_adult: boolean;
  userame: string;
};
export type TUser = {
  user: any;
  email: any;
  name: string;
  id: string;
  role: string;
  createdAt: string;
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  token: string;
  message: string;
  status: number;
};
export type TAuthor = {
  id: number;
  img: string;
  name: string;
  date: string;
  description: string;
};
export type TGenre = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Books: TBook;
};
export type TChapter = {
  id: string | number;
  chapter: string;
  content: string;
};
export type TBook = {
  id: number;
  name: string;
  img: string;
  describe: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  genreId: number;
  Author: TAuthor;
  Genre: TGenre;
  date: string;
  chapter?: TChapter[];
};
export type TUpdateUser = {
  err: number;
  msg: string;
  data: {
    id: number;
    email: string;
    password: string;
    name: string;
    image: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  };
};
