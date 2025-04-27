import { TBook } from "@/fetchApi/type";
import { TChapter } from "@/help/type";
import { Add } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useBookAdd } from "./module/useBookAdd";
import { useBookUpdate } from "./module/useBookUpdate";
import { SelectForm } from "./item/SelectForm";
import { SelectImage } from "./item/SelectImage";
import { useUpdateAuthor } from "../Author/module/useUpdateAuthor";
import { useUpdateCategories } from "../Category/module/useUpdateCategories";
import { useAlert } from "@/component/Alert/AlertContext";

type Inputs = {
  id: string | number;
  name: string;
  author: string | number;
  genre: string | number;
  img: File | string;
  updateBook: boolean;
  modal: boolean;
  chapter: TChapter[];
  book: TBook;
};

export function BookDialog({ refetch }: { refetch: () => void }) {
  const { register, setValue, handleSubmit, reset, watch } =
    useFormContext<Inputs>();
  const { mutate } = useBookAdd();
  const { mutate: mutateUpdate } = useBookUpdate();
  const { showAlert } = useAlert();
  // const { mutate: mutateAuthor } = useUpdateAuthor();
  // const { mutate: mutateCategories } = useUpdateCategories();
  const [chapters, setChapters] = useState<TChapter[]>([
    { title: "", content: "" },
  ]);

  const addChapter = () =>
    setChapters((prev) => [...prev, { title: "", content: "" }]);
  const open = watch("modal");
  const editingBook = watch("updateBook");
  const book = watch("book");
  const id = watch("id");
  const imgFile = watch("img");

  const onSave = ({ name, author, genre, img }: Inputs) => {
    setValue("modal", false);
    setValue("chapter", chapters);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("authorId", String(author));
    formData.append("genreId", String(genre));

    if (img) {
      formData.append("img", img);
    }
    if (editingBook) {
      mutateUpdate(
        { id: String(id), formData },
        {
          onSuccess: () => {
            setValue("modal", false);
            refetch();
            reset();
          },
          onError: (error: any) => {
            console.log(error, "update error");
          },
        }
      );
    } else {
      mutate(formData, {
        onSuccess: () => {
          setValue("modal", false);
          refetch();
          reset();
          showAlert("Added books successfully!", "success");
        },
        onError: (error: any) => {
          console.log(error, "create error");
          showAlert("An error occurred!", "error");
        },
      });
    }
    reset();
  };

  const onCancel = () => setValue("modal", false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file);
    }
  };

  useEffect(() => {
    setValue("chapter", chapters);
    if (editingBook && book) {
      setValue("name", book?.name);
      setValue("author", book?.Author?.id);
      setValue("genre", book?.Genre?.id);
      setValue("img", book?.img);
      setValue("chapter", book.chapter || []);
      setChapters(book?.chapter || []);
    }
  }, [editingBook, book, chapters, setValue]);

  return (
    <Dialog
      open={open}
      onClose={() => setValue("modal", false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent dividers style={{ maxHeight: "70vh" }}>
        <SelectImage imgFile={imgFile} handleImageChange={handleImageChange} />

        <TextField
          {...register("name")}
          fullWidth
          margin="normal"
          label="Book Title"
        />
        <SelectForm registerName="author" />
        <SelectForm registerName="genre" />

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
