import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useAddCategories } from "./module/useAddCategories";
import { useAlert } from "@/component/Alert/AlertContext";

export function CategoryDialogCreate({ refetch }: { refetch: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();
  const { mutate } = useAddCategories();
  const { showAlert } = useAlert();

  const onSave = ({ name }: any) => {
    mutate(name, {
      onSuccess: () => {
        setValue("modal", false);
        showAlert("Create successfully!", "success");
        refetch();
        reset();
      },
      onError: (err) => showAlert(err.message, "error"),
    });
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
