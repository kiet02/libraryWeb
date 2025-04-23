import { TAuthor } from "@/help/type";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AuthorHeader } from "./AuthorHeader";
import { AuthorCard } from "./AutherCard";
import { AuthorDialog } from "./AuthorDialog";
import { AuthorDelete } from "./AutherDelete";

type TForm = {
  name: string;
  bio: string;
  modal: boolean;
  updateAuthor: boolean;
  author: TAuthor;
};

const dummyAuthors: TAuthor[] = [
  {
    id: 1,
    name: "J.K. Rowling",
    bio: "British author",
    date: "2024-01-01",
    description: "đasadad",
  },
  {
    id: 2,
    name: "George R.R. Martin",
    bio: "American novelist",
    date: "2024-01-02",
    description: "đasadad",
  },
];

export function Authors() {
  const methods = useForm<TForm>({
    defaultValues: { modal: false, updateAuthor: false },
  });
  const [authors, setAuthors] = useState<TAuthor[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<TAuthor[]>([]);

  useEffect(() => {
    setAuthors(dummyAuthors);
    setFilteredAuthors(dummyAuthors);
  }, []);

  return (
    <FormProvider {...methods}>
      <AuthorHeader authors={authors} setFilteredAuthors={setFilteredAuthors} />
      <AuthorCard authors={filteredAuthors} />
      <AuthorDialog />
      <AuthorDelete />
    </FormProvider>
  );
}
