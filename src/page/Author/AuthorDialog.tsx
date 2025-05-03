import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AuthorDialogUpdate } from "./AuthorDialogUpdate";
import { AuthorDialogCreate } from "./AuthorDialogCreate";

export function AuthorDialog({ refetch }: { refetch: () => void }) {
  const { watch, setValue, reset } = useFormContext();
  const modal = watch("modal");
  const updateAuthor = watch("updateAuthor");

  const onClose = () => {
    setValue("modal", false);
    reset();
  };

  return (
    <Dialog open={modal} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{updateAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
      <DialogContent>
        {updateAuthor ? (
          <AuthorDialogUpdate refetch={refetch} />
        ) : (
          <AuthorDialogCreate refetch={refetch} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="author-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
