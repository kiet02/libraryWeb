import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

export function AuthorDelete() {
  const { watch, setValue } = useFormContext();
  const open = watch("modalDelete");
  const id = watch("id");

  const closeModal = () => {
    setValue("modalDelete", false);
  };

  const confirmDelete = () => {
    console.log("Deleting author with ID:", id);
    // Logic to handle author deletion (e.g., API call)
    setValue("modalDelete", false);
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this author?
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={confirmDelete} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
