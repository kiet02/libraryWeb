import {
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import { useAlert } from "@/component/Alert/AlertContext";
import { useUserCreateAccount } from "./module/useUserCreateAccount";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "moderator";
  admincode?: string;
};

export function UserDialogAddAccount({ refetch }: { refetch: () => void }) {
  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormContext<Inputs>();

  const { showAlert } = useAlert();
  const { mutateAsync } = useUserCreateAccount();

  const role = watch("role");

  const onSave = async () => {
    try {
      const response = await mutateAsync({
        name: watch("name"),
        email: watch("email"),
        password: watch("password"),
        role: watch("role"),
        adminCode: watch("admincode"),
      });
      showAlert("Account created!", "success");
      refetch();
      reset(); // Reset form sau khi thành công
    } catch (error: any) {
      console.error("Error creating account:", error);
      showAlert(error.message || "Something went wrong", "error");
      reset(); // Reset form khi có lỗi
    }
  };

  return (
    <form id="user-form" onSubmit={handleSubmit(onSave)}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid size={8}>
            <TextField
              {...register("email", { required: "Email is required" })}
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              label="Confirm Password"
              type="password"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>

          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                {...register("role")}
                defaultValue="user"
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {role === "moderator" && (
            <Grid size={8}>
              <TextField
                {...register("admincode", {
                  required: "Admin code is required for moderator role",
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
