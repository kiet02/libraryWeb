import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { UserDialogAddAccount } from "./UserDialogAddAccount";
import { UserDialogChangeRole } from "./UserDialogChangeRole";

export function UserDialog({ refetch }: { refetch: () => void }) {
  const { setValue, watch, reset } = useFormContext();
  const { modal, updateUser } = watch();

  const handleClose = () => {
    setValue("modal", false);
    refetch();
    reset();
  };

  return (
    <Dialog open={modal} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{updateUser ? "Edit Role" : "Create New User"}</DialogTitle>
      <DialogContent dividers>
        {updateUser ? (
          <UserDialogChangeRole refetch={refetch} />
        ) : (
          <UserDialogAddAccount refetch={refetch} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" form="user-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
