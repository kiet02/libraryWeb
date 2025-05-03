import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "./module/useLogin";
import { AccountServer } from "@/help/AccountServer/AccountServer";
import { handleToken } from "@/help/AccountServer/token";

type FormInputs = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { mutate } = useLogin();

  const onSubmit = ({ email, password }: FormInputs) => {
    // 👉 Gọi API ở đây, ví dụ:

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          AccountServer.onAdd({
            id: data.user.id,
            email: data.user.email,
            role: data.user.role,
            token: data.token,
          });
          navigate("/books");
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );

    console.log(handleToken(AccountServer.onGet().token));
    // console.log(AccountServer.onGet());
    // AccountServer.onRemove();
    // // ✅ Giả sử đăng nhập thành công
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email cannot be left blank",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password cannot be left blank",
              minLength: {
                value: 6,
                message: "Password at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
