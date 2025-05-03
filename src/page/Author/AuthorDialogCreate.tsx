import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useAddAuthor } from "./module/useAddAuthor";

export function AuthorDialogCreate({ refetch }: { refetch: () => void }) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext();
  const { mutate } = useAddAuthor();

  const imgFile = watch("img");

  const onSave = ({ name, img, description }: any) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (img) formData.append("img", img);

    mutate(formData, {
      onSuccess: () => {
        setValue("modal", false);
        reset();
        refetch();
      },
      onError: (err) => console.error("Create error:", err),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue("img", file);
  };

  return (
    <form id="author-form" onSubmit={handleSubmit(onSave)}>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        style={{ marginTop: 16, marginBottom: 8 }}
      />
      {imgFile instanceof File && (
        <img
          src={URL.createObjectURL(imgFile)}
          alt="Preview"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      )}

      <TextField
        {...register("name", { required: "Author name is required" })}
        fullWidth
        margin="normal"
        label="Author Name"
        error={!!errors.name}
        helperText={errors.name?.message as string}
      />
      <TextField
        {...register("description")}
        fullWidth
        margin="normal"
        label="Description"
      />
    </form>
  );
}
