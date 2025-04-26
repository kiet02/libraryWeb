import { TCategory } from "@/help/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAddCategories } from "./module/useAddCategories";
import { useUpdateCategories } from "./module/useUpdateCategories";

type Inputs = {
  name: string;
  description: string;
  updateCategory: boolean;
  modal: boolean;
  category: TCategory;
  id: string | number;
};

export function CategoryDialog({ refetch }: { refetch: () => void }) {
  const { register, setValue, handleSubmit, watch, reset, getValues } =
    useFormContext<Inputs>();
  const { mutate } = useAddCategories();
  const { mutate: mutateUpdate } = useUpdateCategories();
  const open = watch("modal");
  const updateCategory = watch("updateCategory");
  const id = watch("id");

  const onSave = ({ name, description }: Inputs) => {
    if (updateCategory) {
      mutateUpdate(
        { id, name },
        {
          onSuccess: () => {
            setValue("modal", false);
            refetch();
          },
          onError: (error: any) => {
            console.log(error, "sdsd");
          },
        }
      );
      setValue("modal", false);
      reset();
      return;
    }
    mutate(name, {
      onSuccess: () => {
        setValue("modal", false);
        refetch();
      },
      onError: (error: any) => {
        console.log(error, "sdsd");
      },
    });
    setValue("modal", false);

    reset();
  };

  const onCancel = () => setValue("modal", false);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        {updateCategory ? "Edit Category" : "Add Category"}
      </DialogTitle>
      <DialogContent>
        <TextField
          {...register("name")}
          fullWidth
          margin="normal"
          label="Category Name"
        />
        <TextField
          {...register("description")}
          fullWidth
          margin="normal"
          label="Description"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSave)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
