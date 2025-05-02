import { BookCard } from "./BookCard";
import { FormProvider, useForm } from "react-hook-form";
import { BookDialog } from "./BookDialog";
import { TData } from "@/help/type";
import { BookDelete } from "./BookDelete";
import { BookHeader } from "./BookHeader";
import { useEffect, useState } from "react";
import { useBook } from "./module/useBook";
import PaginationComponent from "@/component/PaginationComponent/PaginationComponent";

export function Books() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const methods = useForm<Omit<TData, "id">>();

  const { data, refetch, isLoading } = useBook({ page, limit: 10, search });

  useEffect(() => {
    refetch();
  }, [search, page]);

  return (
    <FormProvider {...methods}>
      <BookHeader setSearch={setSearch} />

      <BookCard books={data?.books || []} />
      <BookDialog refetch={refetch} />
      <BookDelete refetch={refetch} />

      <PaginationComponent
        page={page}
        setPage={setPage}
        limit={10}
        totalItems={data?.pagination?.totalItems || 0}
        isLoading={isLoading}
      />
    </FormProvider>
  );
}
