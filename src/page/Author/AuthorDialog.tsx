import { TAuthor } from "@/help/type";
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
  updateAuthor: boolean;
  modal: boolean;
  author: TAuthor;
};

export function AuthorDialog() {
  const { register, setValue, handleSubmit, watch, reset } =
    useFormContext<Inputs>();
  const open = watch("modal");
  const updateAuthor = watch("updateAuthor");
  const author = watch("author");

  const onSave = ({ name, description }: Inputs) => {
    console.log(name, description);
    setValue("modal", false);
    reset();
  };

  const onCancel = () => setValue("modal", false);

  useEffect(() => {
    if (updateAuthor && author) {
      setValue("name", author.name);
      setValue("description", author.description);
    }
  }, [updateAuthor, author, setValue]);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{updateAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name")}
          fullWidth
          margin="normal"
          label="Author Name"
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
