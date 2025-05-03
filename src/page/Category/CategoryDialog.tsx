import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CategoryDialogUpdate } from "./CategoryDialogUpdate";
import { CategoryDialogCreate } from "./CategoryDialogCreate";

export function CategoryDialog({ refetch }: { refetch: () => void }) {
  const { watch, setValue, reset } = useFormContext();
  const open = watch("modal");
  const isUpdate = watch("updateCategory");

  const onClose = () => {
    setValue("modal", false);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isUpdate ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        {isUpdate ? (
          <CategoryDialogUpdate refetch={refetch} />
        ) : (
          <CategoryDialogCreate refetch={refetch} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="category-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
