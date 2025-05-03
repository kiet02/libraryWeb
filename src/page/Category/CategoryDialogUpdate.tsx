import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUpdateCategories } from "./module/useUpdateCategories";

export function CategoryDialogUpdate({ refetch }: { refetch: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const { mutate } = useUpdateCategories();
  const category = watch("category");
  const id = watch("id");

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category, setValue]);

  const onSave = ({ name }: any) => {
    mutate(
      { id, name },
      {
        onSuccess: () => {
          setValue("modal", false);
          refetch();
          reset();
        },
        onError: (err) => console.error("Update error:", err),
      }
    );
  };

  return (
    <form id="category-form" onSubmit={handleSubmit(onSave)}>
      <TextField
        {...register("name", { required: "Category name is required" })}
        fullWidth
        margin="normal"
        label="Category Name"
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <TextField
        {...register("description")}
        fullWidth
        margin="normal"
        label="Description"
      />
    </form>
  );
}
