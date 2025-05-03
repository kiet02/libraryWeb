import { TUser } from "@/fetchApi/type";
import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUserDelete } from "./module/useUserDelete";
import { useAlert } from "@/component/Alert/AlertContext";

export function UserCard({
  users,
  refetch,
}: {
  users: TUser[];
  refetch: () => void;
}) {
  const { setValue } = useFormContext();

  const handleEdit = (user: TUser) => {
    setValue("user", user);
    setValue("updateUser", true);
    setValue("modal", true);
    setValue("id", user.id);
  };

  const handleDelete = (user: TUser) => {
    setValue("id", user.id);
    setValue("modalDelete", true);
  };

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
