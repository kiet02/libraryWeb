import { TCategory } from "@/help/type";
import { Edit, Delete } from "@mui/icons-material";
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

export function CategoryCard({ categories }: { categories: TCategory[] }) {
  const { setValue } = useFormContext();

  const handleEdit = (category: TCategory) => {
    setValue("category", category);
    setValue("name", category.name);
    setValue("description", category.description);
    setValue("updateCategory", true);
    setValue("modal", true);
    setValue("id", category.id);
  };

  const handleDelete = (category: TCategory) => {
    setValue("id", category.id);
    setValue("modalDelete", true);
  };

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell>Description</TableCell> */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                {/* <TableCell>{category.description}</TableCell> */}
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(category)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category)}
                  >
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
