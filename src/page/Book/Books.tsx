import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BookCard } from "./BookCard";
import { FormProvider, useForm } from "react-hook-form";
import { BookDialog } from "./BookDialog";
import { TData } from "@/help/type";
import { BookDelete } from "./BookDelete";
import { BookHeader } from "./BookHeader";
import { useState } from "react";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    image: "https://via.placeholder.com/50",
    date: "2024-01-10",
    chapter: [
      { title: "chapter1", content: "oklalallaasds" },
      { title: "chapter2", content: "oklalallaasds" },
      { title: "chapter3", content: "oklalallaasds" },
    ],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Drama",
    image: "https://via.placeholder.com/50",
    date: "2023-11-21",
    chapter: [],
  },
];

export function Books() {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const methods = useForm<Omit<TData, "id">>();
  // Replace with the actual search term

  return (
    <FormProvider {...methods}>
      <BookHeader books={books} setFilteredBooks={setFilteredBooks} />
      <BookCard books={filteredBooks} />
      <BookDialog />
      <BookDelete />
    </FormProvider>
  );
}
