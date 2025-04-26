import { TAuthor } from "@/help/type";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AuthorHeader } from "./AuthorHeader";
import { AuthorCard } from "./AutherCard";
import { AuthorDialog } from "./AuthorDialog";
import { AuthorDelete } from "./AutherDelete";
import { useAuthor } from "./module/useAuthor";

type TForm = {
  name: string;
  bio: string;
  modal: boolean;
  updateAuthor: boolean;
  author: TAuthor;
};

export function Authors() {
  const methods = useForm<TForm>({
    defaultValues: { modal: false, updateAuthor: false },
  });
  const [filteredAuthors, setFilteredAuthors] = useState<TAuthor[]>([]);
  const { data, error, isLoading, refetch } = useAuthor();

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredAuthors(data);
    } else {
      setFilteredAuthors([]);
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <AuthorHeader
        filteredAuthors={data}
        setFilteredAuthors={setFilteredAuthors}
      />
      <AuthorCard authors={filteredAuthors} />
      <AuthorDialog refetch={refetch} />
      <AuthorDelete refetch={refetch} />
    </FormProvider>
  );
}
