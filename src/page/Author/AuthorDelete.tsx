import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDeleteAuthor } from "./module/useDeleteAuthor";

export function AuthorDelete({ refetch }: { refetch: () => void }) {
  const { watch, setValue } = useFormContext();

  const { mutate } = useDeleteAuthor();
  const open = watch("modalDelete");
  const id = watch("id");

  const closeModal = () => {
    setValue("modalDelete", false);
  };

  const confirmDelete = () => {
    console.log("Deleting author with ID:", id);
    mutate(id, {
      onSuccess: () => {
        setValue("modalDelete", false);
        refetch();
      },
      onError: (error: any) => {
        alert("❌ Xoá thất bại: " + (error?.message || "Có lỗi xảy ra"));
      },
    });
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
