import { TBook, TChapter } from "@/fetchApi/type";
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
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useBookAdd } from "./module/useBookAdd";
import { useBookUpdate } from "./module/useBookUpdate";
import { SelectForm } from "./item/SelectForm";
import { SelectImage } from "./item/SelectImage";
import { useAlert } from "@/component/Alert/AlertContext";
import { useChapter } from "./module/useChapter";
import { useChapterAdd } from "./module/useChapterAdd";
import { useChapterUpdate } from "./module/useChapterUpdate";

type Inputs = {
  id: string | number;
  name: string;
  author: string | number;
  genre: string | number;
  img: File | string;
  updateBook: boolean;
  modal: boolean;
  chapters: TChapter[];
  book: TBook;
};

export function BookDialog({ refetch }: { refetch: () => void }) {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useFormContext<Inputs>();

  const { showAlert } = useAlert();
  const { modal, updateBook, book, chapters, id, img } = watch();
  const { mutate } = useBookAdd();
  const { mutate: mutateUpdate } = useBookUpdate();
  const { data: chapterData } = useChapter(id);
  const { mutate: mutateChapter } = useChapterAdd();
  const { mutate: mutateUpdateChapter } = useChapterUpdate();

  const { fields, append, remove } = useFieldArray({
    name: "chapters",
  });

  const addChapter = () => append({ chapter: "", content: "" });

  const onSave = ({ name, author, genre, img }: Inputs) => {
    const invalidChapters = chapters.some((ch) => !ch.chapter || !ch.content);
    if (invalidChapters) {
      showAlert("Please fill all chapter titles and contents.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("authorId", String(author));
    formData.append("genreId", String(genre));
    if (img) formData.append("img", img);

    const payload = {
      id,
      formData,
      chapters: chapters,
    };

    if (updateBook) {
      mutateUpdate(payload, {
        onSuccess: (data) => {
          // 👇 Kiểm tra dữ liệu chương từ server
          const isExistingChapters = chapterData && chapterData.length > 0;
          const isAddChapter =
            chapterData && chapterData.length < chapters.length;

          if (isExistingChapters) {
            mutateUpdateChapter(
              {
                id: data.id,
                chapter: chapters.map((item) => ({
                  id: item.id, // cần có ID để update
                  chapter: item.chapter,
                  content: item.content,
                })),
              },
              {
                onSuccess: () => {
                  setValue("modal", false);
                  refetch();
                  reset();
                  showAlert("Updated successfully!", "success");
                },
              }
            );
          }
          if (isAddChapter || !isExistingChapters) {
            mutateChapter(
              {
                id: data.id,
                chapter: chapters,
              },
              {
                onSuccess: () => {
                  showAlert("Chapters created!", "success");
                  refetch();
                  reset();
                  remove();
                },
                onError: (error: any) => {
                  console.error(error);
                  showAlert("Create chapter failed!", "error");
                },
              }
            );
          }
        },
        onError: (error: any) => {
          console.error(error);
          showAlert("Update failed", "error");
        },
      });
    } else {
      mutate(formData, {
        onSuccess: (data) => {
          mutateChapter(
            {
              id: data.id,
              chapter: chapters,
            },
            {
              onSuccess: () => {
                showAlert("Book added!", "success");
                refetch();
                reset();
                remove();
              },
              onError: (error: any) => {
                console.error(error);
                showAlert("Create chapter fail!", "error");
              },
            }
          );
          setValue("modal", false);
        },
        onError: (error: any) => {
          console.error(error);
          showAlert("Create failed", "error");
        },
      });
    }
  };

  useEffect(() => {
    if (updateBook && book) {
      setValue("name", book.name);
      setValue("author", book.Author?.id);
      setValue("genre", book.Genre?.id);
      setValue("img", book.img);
      setValue("chapters", chapterData?.length ? chapterData : []);
    }
  }, [updateBook, book, chapterData, setValue]);

  return (
    <Dialog
      open={modal}
      onClose={() => setValue("modal", false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{updateBook ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent dividers style={{ maxHeight: "70vh" }}>
        <SelectImage
          imgFile={img}
          handleImageChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue("img", file);
          }}
        />
        <TextField
          {...register("name", { required: "Book title is required" })}
          fullWidth
          margin="normal"
          label="Book Title"
        />
        {errors.name && (
          <Typography color="error">{errors.name.message}</Typography>
        )}

        <SelectForm registerName="author" />
        {errors.author && (
          <Typography color="error">{errors.author.message}</Typography>
        )}

        <SelectForm registerName="genre" />
        {errors.genre && (
          <Typography color="error">{errors.genre.message}</Typography>
        )}

        <Typography
          variant="subtitle1"
          fontWeight={500}
          style={{ marginTop: 16 }}
        >
          Chapters
        </Typography>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}
          >
            <TextField
              fullWidth
              {...register(`chapters.${index}.chapter`, {
                required: "Chapter title is required",
              })}
              label="Chapter Title"
              margin="dense"
            />
            {errors.chapters?.[index]?.chapter && (
              <Typography color="error">
                {errors.chapters[index].chapter.message}
              </Typography>
            )}

            <TextField
              fullWidth
              {...register(`chapters.${index}.content`, {
                required: "Chapter content is required",
              })}
              label="Chapter Content"
              margin="dense"
            />
            {errors.chapters?.[index]?.content && (
              <Typography color="error">
                {errors.chapters[index].content.message}
              </Typography>
            )}
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => remove(index)}
                style={{
                  background: "red",
                  color: "white",
                  padding: "4px 8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Xóa chương
              </button>
            </div>
          </div>
        ))}

        <Button variant="outlined" startIcon={<Add />} onClick={addChapter}>
          Add Chapter
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setValue("modal", false), refetch(), reset(), remove();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSave)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
