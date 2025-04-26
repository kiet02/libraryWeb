import { TCategory } from "@/help/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDeleteCategories } from "./module/useDeleteCategories";

export function CategoryDelete({ refetch }: { refetch: () => void }) {
  const { watch, setValue } = useFormContext();
  const { mutate } = useDeleteCategories();
  const open = watch("modalDelete");
  const id = watch("id");

  const closeModal = () => {
    setValue("modalDelete", false);
  };

  const confirmDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setValue("modalDelete", false);
        refetch();
      },
      onError: (error: any) => {
        alert("❌ Xoá thất bại: " + (error?.message || "Có lỗi xảy ra"));
      },
    });
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this category?
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
