import { TAuthor } from "@/help/type";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAddAuthor } from "./module/useAddAuthor";
import { useUpdateAuthor } from "./module/useUpdateAuthor";

type Inputs = {
  name: string;
  description: string;
  updateAuthor: boolean;
  modal: boolean;
  author: TAuthor;
  id: string | number;
  img: File | null;
};

export function AuthorDialog({ refetch }: { refetch: () => void }) {
  const { register, setValue, handleSubmit, watch, reset } =
    useFormContext<Inputs>();
  const { mutate } = useAddAuthor();
  const { mutate: mutateUpdate } = useUpdateAuthor();

  const open = watch("modal");
  const updateAuthor = watch("updateAuthor");
  const author = watch("author");
  const id = watch("id");
  const imgFile = watch("img");
  console.log("====================================");
  console.log(imgFile);
  console.log("====================================");
  useEffect(() => {
    if (updateAuthor && author) {
      setValue("name", author.name);
      setValue("description", author.description);
    }
  }, [updateAuthor, author, setValue]);

  const onSave = ({ name, img, description }: Inputs) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (img) {
      formData.append("img", img);
    }

    if (updateAuthor) {
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
        },
        onError: (error: any) => {
          console.log(error, "create error");
        },
      });
    }
  };

  const onCancel = () => {
    setValue("modal", false);
    reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{updateAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name")}
          fullWidth
          margin="normal"
          label="Author Name"
        />
        <TextField
          {...register("description")}
          fullWidth
          margin="normal"
          label="Description"
        />

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          style={{ marginTop: 16 }}
        />

        {/* Preview ảnh mới nếu đã chọn */}
        {/* Nếu imgFile là File => preview ảnh mới */}
        {imgFile instanceof File && (
          <img
            src={URL.createObjectURL(imgFile)}
            alt="Preview"
            style={{
              marginTop: 12,
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        )}

        {/* Nếu imgFile là string => ảnh từ server (đang edit) */}
        {typeof imgFile === "string" && (
          <img
            src={imgFile}
            alt="Preview"
            style={{
              marginTop: 12,
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        )}
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
