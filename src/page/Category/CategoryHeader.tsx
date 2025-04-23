import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TCategory } from "@/help/type";

type TCategoryHeader = {
  setFilteredCategories: (value: TCategory[]) => void;
  categories: TCategory[];
};

export function CategoryHeader({
  categories,
  setFilteredCategories,
}: TCategoryHeader) {
  const [searchTerm, setSearchTerm] = useState("");
  const { setValue } = useFormContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value.toLowerCase()) ||
        category.description.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCategories(filtered);
  };

  const addCategory = () => {
    setValue("modal", true);
    setValue("updateCategory", false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        marginBottom: 16,
      }}
    >
      <h2 style={{ margin: 0, fontWeight: "bolder", fontSize: 20 }}>
        Category Management
      </h2>
      <div style={{ flexGrow: 1, maxWidth: 800 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by name, description..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon fontSize="small" style={{ marginRight: 8 }} />
            ),
          }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={addCategory}>
        + ADD CATEGORY
      </Button>
    </div>
  );
}
