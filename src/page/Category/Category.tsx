import { useState } from "react";
import { CategoryHeader } from "./CategoryHeader"; // Đảm bảo import đúng
import { CategoryCard } from "./CategoryCard";
import { CategoryDialog } from "./CategoryDialog";
import { CategoryDelete } from "./CategoryDelete";
import { FormProvider, useForm } from "react-hook-form";

const categories = [
  { id: 1, name: "Fiction", description: "Fictional books" },
  { id: 2, name: "Non-Fiction", description: "Non-Fictional books" },
];

export function Categories() {
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CategoryHeader
        categories={categories}
        setFilteredCategories={setFilteredCategories}
      />
      <CategoryCard categories={filteredCategories} />
      <CategoryDialog />
      <CategoryDelete />
    </FormProvider>
  );
}
