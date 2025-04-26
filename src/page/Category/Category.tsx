import { useEffect, useState } from "react";
import { CategoryHeader } from "./CategoryHeader"; // Đảm bảo import đúng
import { CategoryCard } from "./CategoryCard";
import { CategoryDialog } from "./CategoryDialog";
import { CategoryDelete } from "./CategoryDelete";
import { FormProvider, useForm } from "react-hook-form";
import { useCategories } from "./module/useCategories";
import { TCategory } from "@/help/type";

export function Categories() {
  const [filteredCategories, setFilteredCategories] = useState<TCategory[]>([]);
  const methods = useForm();

  const { data, error, isLoading, refetch } = useCategories();

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredCategories(data);
    } else {
      setFilteredCategories([]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <FormProvider {...methods}>
      <CategoryHeader
        categories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
      />
      <CategoryCard categories={filteredCategories} />
      <CategoryDialog refetch={refetch} />
      <CategoryDelete refetch={refetch} />
    </FormProvider>
  );
}
