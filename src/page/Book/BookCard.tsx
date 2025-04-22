import { TBook, TData } from "@/help/type";
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

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    image: "https://via.placeholder.com/50",
    date: "2024-01-10",
    chapter: [
      { title: "chapter1", content: "oklalallaasds" },
      { title: "chapter2", content: "oklalallaasds" },
      { title: "chapter3", content: "oklalallaasds" },
    ],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Drama",
    image: "https://via.placeholder.com/50",
    date: "2023-11-21",
    chapter: [],
  },
];

export function BookCard() {
  const { setValue } = useFormContext<TData>();

  const handleEdit = (book: TBook) => {
    setValue("book", { ...book, chapter: book.chapter || [] });
    setValue("updateBook", true);
    setValue("modal", true);
  };

  const handleDelete = (book: TBook) => {
    setValue("id", book.id);
    setValue("modalDelete", true);
  };

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
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>
                  <img
                    src={book.image}
                    alt={book.title}
                    width={40}
                    height={40}
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
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
