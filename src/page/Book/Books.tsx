import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BookCard } from "./BookCard";
import { FormProvider, useForm } from "react-hook-form";
import { BookDialog } from "./BookDialog";
import { TData } from "@/help/type";
import { BookDelete } from "./BookDelete";

export function Books() {
  const methods = useForm<Omit<TData, "id">>();
  const { setValue, reset } = methods;

  const addBook = () => {
    reset();
    setValue("updateBook", false);
    setValue("modal", true);
  };

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Book Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={addBook}>
            Add Book
          </Button>
        </div>
        <BookCard />
        <BookDialog />
        <BookDelete />
      </div>
    </FormProvider>
  );
}
