import { TBook, TChapter } from "@/help/type";
import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type Inputs = {
  title: string;
  author: string;
  genre: string;
  image: string;
  updateBook: boolean;
  modal: boolean;
  chapter: TChapter[];
  book: TBook;
};

export function BookDialog() {
  const { register, setValue, handleSubmit, reset, watch } =
    useFormContext<Inputs>();
  const [chapters, setChapters] = useState<TChapter[]>([
    { title: "", content: "" },
  ]);

  const addChapter = () =>
    setChapters((prev) => [...prev, { title: "", content: "" }]);
  const open = watch("modal");
  const editingBook = watch("updateBook");
  const book = watch("book");

  const onSave = ({ title, author, genre, image }: Inputs) => {
    setValue("modal", false);
    setValue("chapter", chapters);

    console.log(title, author, genre, image);

    reset();
  };

  const onCancel = () => setValue("modal", false);

  useEffect(() => {
    setValue("chapter", chapters);
  }, [chapters, setValue]);

  useEffect(() => {
    if (editingBook && book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("genre", book.genre);
      setValue("image", book.image);
      setValue("chapter", book.chapter || []);
      setChapters(book.chapter);
    }
  }, [editingBook, book, setValue]);

  return (
    <Dialog
      open={open}
      onClose={() => setValue("modal", false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent dividers style={{ maxHeight: "70vh" }}>
        <TextField
          {...register("title")}
          fullWidth
          margin="normal"
          label="Book Title"
        />
        <TextField
          {...register("author")}
          fullWidth
          margin="normal"
          label="Author"
        />
        <TextField
          {...register("genre")}
          fullWidth
          margin="normal"
          label="Genre"
        />
        <TextField
          {...register("image")}
          fullWidth
          margin="normal"
          label="Image URL"
        />

        <Typography
          variant="subtitle1"
          fontWeight={500}
          style={{ marginTop: 16 }}
        >
          Chapters
        </Typography>
        {chapters.map((_, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <TextField
              fullWidth
              {...register(`chapter.${index}.title`)}
              label="Chapter Title"
              margin="dense"
            />
            <TextField
              fullWidth
              {...register(`chapter.${index}.content`)}
              label="Chapter Content"
              margin="dense"
            />
          </div>
        ))}
        <Button variant="outlined" startIcon={<Add />} onClick={addChapter}>
          Add Chapter
        </Button>
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
