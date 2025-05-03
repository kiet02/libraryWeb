import { TBook, TChapter } from "@/fetchApi/type";
import { useAuthor } from "@/page/Author/module/useAuthor";
import { useCategories } from "@/page/Category/module/useCategories";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
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
  error,
  helperText,
}: {
  registerName: "author" | "genre";
  error: boolean;
  helperText?: string;
}) {
  const { register, watch } = useFormContext<Inputs>();

  const { data } = registerName === "author" ? useAuthor() : useCategories();
  const label = registerName === "author" ? "Author" : "Genre";
  const id = watch(registerName); // Get the selected value

  return (
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel id={`${registerName}-label`}>{label}</InputLabel>
      <Select
        labelId={`${registerName}-label`}
        label={label}
        value={id || ""}
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
