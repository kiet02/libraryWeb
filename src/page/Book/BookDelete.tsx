import { TData } from "@/help/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useBookDelete } from "./module/useBookDelete";
import { useChapterDelete } from "./module/useChapterDelete";
import { useAlert } from "@/component/Alert/AlertContext";

export function BookDelete({ refetch }: { refetch: () => void }) {
  const { watch, setValue } = useFormContext<TData>();
  const { mutate } = useBookDelete();

  const { showAlert } = useAlert();
  const open = watch("modalDelete");
  const id = watch("id");

  const closeModal = () => {
    setValue("modalDelete", false);
  };

  const confirmDelete = () => {
    console.log(id);
    mutate(id, {
      onSuccess: () => {
        showAlert("Delete book successfully!", "success");
        refetch();
      },
      onError: () => {
        showAlert("Delete book error!", "error");
      },
    });
    setValue("modalDelete", false);
  };

  return (
    <Dialog open={open} onClose={() => closeModal}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>Are you sure you want to delete this item?</DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal()}>Cancel</Button>
        <Button onClick={() => confirmDelete()} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
