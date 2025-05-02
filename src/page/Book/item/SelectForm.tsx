import { TBook, TChapter } from "@/fetchApi/type";
import { useAuthor } from "@/page/Author/module/useAuthor";
import { useCategories } from "@/page/Category/module/useCategories";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

type Inputs = {
  id: string | number;
  name: string;
  author: string;
  genre: string;
  img: string;
  updateBook: boolean;
  modal: boolean;
  chapter: TChapter[];
  book: TBook;
  customAuthor?: string;
  customGenre?: string;
};

export function SelectForm({
  registerName,
}: {
  registerName: "author" | "genre";
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Inputs>();

  const { data } = registerName === "author" ? useAuthor() : useCategories();
  const label = registerName === "author" ? "Author" : "Genre";
  const id = watch(registerName); // Use `watch` directly for the selected value

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id={`${registerName}-label`}>{label}</InputLabel>
        <Select
          labelId={`${registerName}-label`}
          label={label}
          value={id || ""} // Use `value` instead of `defaultValue`
          {...register(registerName, { required: `${label} is required` })}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value="custom">Khác</MenuItem>
        </Select>
      </FormControl>

      {/* Uncomment this part if you need the "custom" input */}
      {/* {id === "custom" && (
        <TextField
          {...register(
            `custom${
              registerName.charAt(0).toUpperCase() + registerName.slice(1)
            }` as const
          )}
          fullWidth
          margin="normal"
          label={`Nhập ${label}`}
        />
      )} */}
    </>
  );
}
