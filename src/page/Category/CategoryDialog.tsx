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

type Inputs = {
  name: string;
  description: string;
  updateCategory: boolean;
  modal: boolean;
  category: TCategory;
};

export function CategoryDialog() {
  const { register, setValue, handleSubmit, watch, reset } =
    useFormContext<Inputs>();
  const open = watch("modal");
  const updateCategory = watch("updateCategory");

  const onSave = ({ name, description }: Inputs) => {
    console.log(name, description);
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
