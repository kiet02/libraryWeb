import { TBook } from "@/fetchApi/type";
import { TData } from "@/help/type";
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

export function BookCard({ books }: { books: TBook[] }) {
  const { setValue } = useFormContext<TData>();

  const handleEdit = (book: TBook) => {
    setValue("book", { ...book, chapter: book.chapter || [] });
    setValue("updateBook", true);
    setValue("modal", true);
    setValue("id", book.id);
  };

  const handleDelete = (book: TBook) => {
    setValue("id", book.id);
    setValue("modalDelete", true);
  };

  // Pagination states

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book: TBook) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>
                  <img
                    src={book.img}
                    alt={book.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book?.Author?.name}</TableCell>
                <TableCell>{book?.Genre?.name}</TableCell>
                <TableCell>{book.date}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(book)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(book)}>
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
