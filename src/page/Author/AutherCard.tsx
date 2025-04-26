import { TAuthor } from "@/help/type";
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

export function AuthorCard({ authors }: { authors?: TAuthor[] }) {
  const { setValue } = useFormContext();

  const handleEdit = (author: TAuthor) => {
    setValue("author", author);
    setValue("updateAuthor", true);
    setValue("modal", true);
    setValue("id", author.id);
    setValue("img", author.img);
  };
  const handleDelete = (author: TAuthor) => {
    setValue("id", author.id);
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
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>
                  <img
                    src={author.img}
                    alt={author.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(author)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(author)}
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
