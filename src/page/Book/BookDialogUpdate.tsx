import { TextField, Typography, Button } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { SelectForm } from "./item/SelectForm";
import { SelectImage } from "./item/SelectImage";
import { useAlert } from "@/component/Alert/AlertContext";
import { useBookUpdate } from "./module/useBookUpdate";
import { useChapter } from "./module/useChapter";
import { useChapterAdd } from "./module/useChapterAdd";
import { useChapterUpdate } from "./module/useChapterUpdate";

export function BookDialogUpdate({ refetch }: { refetch: () => void }) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext();

  const { showAlert } = useAlert();
  const { id, img, chapters, book } = watch();

  const { mutate: mutateUpdateBook } = useBookUpdate();
  const { mutate: mutateAddChapter } = useChapterAdd();
  const { mutate: mutateUpdateChapter } = useChapterUpdate();
  const { data: chapterData } = useChapter(id);

  const { fields, append, remove } = useFieldArray({ name: "chapters" });

  const addChapter = () => append({ chapter: "", content: "" });

  const onSave = ({ name, author, genre, img }: any) => {
    const invalidChapters =
      Array.isArray(chapters) &&
      chapters.some((ch) => !ch.chapter || !ch.content);

    if (invalidChapters) {
      showAlert("Please fill all chapter titles and contents.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("authorId", String(author));
    formData.append("genreId", String(genre));
    if (img) formData.append("img", img);

    const payload = { id, formData, chapters };

    mutateUpdateBook(payload, {
      onSuccess: (data) => {
        const isExistingChapters = chapterData && chapterData.length > 0;
        const isAddChapter =
          chapterData && chapterData.length < chapters.length;

        if (isExistingChapters) {
          mutateUpdateChapter(
            {
              id: data.id,
              chapter: chapters.map((item: any) => ({
                id: item.id,
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
              onError: () => showAlert("Update chapter failed", "error"),
            }
          );
        }

        if (isAddChapter || !isExistingChapters) {
          mutateAddChapter(
            {
              id: data.id,
              chapter: chapters,
            },
            {
              onSuccess: () => {
                showAlert("Chapters added!", "success");
                refetch();
                reset();
                remove();
              },
              onError: () => showAlert("Add chapter failed", "error"),
            }
          );
        }
      },
      onError: () => showAlert("Update failed", "error"),
    });
  };

  useEffect(() => {
    if (book) {
      setValue("name", book.name);
      setValue("author", book.Author?.id);
      setValue("genre", book.Genre?.id);
      setValue("img", book.img);
      setValue("chapters", chapterData?.length ? chapterData : []);
    }
  }, [book, chapterData, setValue]);

  return (
    <form id="book-form" onSubmit={handleSubmit(onSave)}>
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
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <SelectForm
        registerName="author"
        error={!!errors.author}
        helperText={errors.author?.message as string}
      />
      <SelectForm
        registerName="genre"
        error={!!errors.genre}
        helperText={errors.genre?.message as string}
      />

      <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 2 }}>
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
            error={!!(errors.chapters as any)?.[index]?.chapter}
            helperText={
              (errors.chapters as any)?.[index]?.chapter?.message as string
            }
          />
          <TextField
            fullWidth
            {...register(`chapters.${index}.content`, {
              required: "Chapter content is required",
            })}
            label="Chapter Content"
            margin="dense"
            error={!!(errors.chapters as any)?.[index]?.content}
            helperText={
              (errors.chapters as any)?.[index]?.content?.message as string
            }
          />
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
    </form>
  );
}
