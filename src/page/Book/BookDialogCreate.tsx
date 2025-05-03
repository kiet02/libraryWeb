import { TextField, Typography, Button } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { SelectForm } from "./item/SelectForm";
import { SelectImage } from "./item/SelectImage";
import { useAlert } from "@/component/Alert/AlertContext";
import { useBookAdd } from "./module/useBookAdd";
import { useChapterAdd } from "./module/useChapterAdd";

export function BookDialogCreate({ refetch }: { refetch: () => void }) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext();
  const { showAlert } = useAlert();
  const { mutate } = useBookAdd();
  const { mutate: mutateChapter } = useChapterAdd();

  const { img, chapters } = watch();
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

    mutate(formData, {
      onSuccess: (data) => {
        mutateChapter(
          {
            id: data.id,
            chapter: chapters,
          },
          {
            onSuccess: () => {
              showAlert("Create chapter successfully!", "success");
            },
            onError: () => showAlert("Create chapter fail!", "error"),
          }
        );
        showAlert("Create chapter successfully!", "success");

        refetch();
        reset();
        remove();
        setValue("modal", false);
      },
      onError: (error: any) => showAlert(error.message, "error"),
    });
  };

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
