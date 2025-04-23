import { TUser } from "@/help/type";
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
  username: string;
  email: string;
  password: string;
  role: string;
  updateUser: boolean;
  modal: boolean;
  user: TUser;
};

export function UserDialog() {
  const { register, setValue, handleSubmit, watch, reset } =
    useFormContext<Inputs>();
  const open = watch("modal");
  const updateUser = watch("updateUser");
  const user = watch("user");

  const onSave = ({ username, email, password, role }: Inputs) => {
    console.log(username, email, password, role);
    setValue("modal", false);
    reset();
  };

  const onCancel = () => setValue("modal", false);

  useEffect(() => {
    if (updateUser && user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [updateUser, user, setValue]);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{updateUser ? "Edit Role" : "Add User"}</DialogTitle>
      <DialogContent>
        {!updateUser && (
          <TextField
            {...register("username")}
            fullWidth
            margin="normal"
            label="Username"
          />
        )}
        {!updateUser && (
          <TextField
            {...register("email")}
            fullWidth
            margin="normal"
            label="Email"
          />
        )}
        {!updateUser && (
          <TextField
            {...register("password")}
            fullWidth
            margin="normal"
            label="Password"
            type="password"
          />
        )}
        <TextField
          {...register("role")}
          fullWidth
          margin="normal"
          label="Role"
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
