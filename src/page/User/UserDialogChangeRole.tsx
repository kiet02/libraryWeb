import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUserChangeRole } from "./module/useUserChangeRole";
import { useAlert } from "@/component/Alert/AlertContext";
import { useEffect } from "react";

type Inputs = {
  id: string | number;
  role: "user" | "moderator";
  admincode: string;
};

export function UserDialogChangeRole({ refetch }: { refetch: () => void }) {
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Inputs>();

  const { showAlert } = useAlert();
  const { mutateAsync } = useUserChangeRole();
  const selectedRole = watch("role");
  const userId = watch("id");

  const onSave = async () => {
    try {
      await mutateAsync({
        id: userId,
        newRole: selectedRole,
        adminCode: watch("admincode"),
      });

      showAlert("Change role successfully!", "success");
      refetch();
      reset();
    } catch (error: any) {
      console.error("❌ Role change error:", error);
      showAlert(error.message || "Something went wrong", "error");
      reset();
    }
  };

  return (
    <form id="user-form" onSubmit={handleSubmit(onSave)}>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Role Selection */}
          <Grid size={12}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                label="Role"
                defaultValue="user"
                value={selectedRole}
                onChange={(e) =>
                  setValue("role", e.target.value as "user" | "moderator")
                }
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Admin Code */}
          {selectedRole === "moderator" && (
            <Grid size={12}>
              <TextField
                {...register("admincode", {
                  required: "Admin code is required when assigning admin role",
                })}
                label="Admin Code"
                fullWidth
                error={!!errors.admincode}
                helperText={errors.admincode?.message}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </form>
  );
}
