import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BookDialogCreate } from "./BookDialogCreate";
import { BookDialogUpdate } from "./BookDialogUpdate";

export function BookDialog({ refetch }: { refetch: () => void }) {
  const { setValue, watch, reset } = useFormContext();
  const { modal, updateBook } = watch();

  const handleClose = () => {
    setValue("modal", false);
    refetch();
    reset();
  };

  return (
    <Dialog open={modal} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{updateBook ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent dividers style={{ maxHeight: "70vh" }}>
        {updateBook ? (
          <BookDialogUpdate refetch={refetch} />
        ) : (
          <BookDialogCreate refetch={refetch} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="book-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
