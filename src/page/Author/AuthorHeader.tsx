import { TAuthor } from "@/help/type";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type TAuthorHeader = {
  filteredAuthors?: TAuthor[];
  setFilteredAuthors: (value: TAuthor[]) => void;
};

export function AuthorHeader({
  filteredAuthors,
  setFilteredAuthors,
}: TAuthorHeader) {
  const [searchTerm, setSearchTerm] = useState("");
  const { setValue, reset } = useFormContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = filteredAuthors?.filter(
      (author) =>
        author.name?.toLowerCase().includes(value?.toLowerCase()) ||
        author.description?.toLowerCase().includes(value?.toLowerCase())
    );
    setFilteredAuthors(filtered || []);
  };

  const addAuthor = () => {
    reset();
    setValue("updateAuthor", false);
    setValue("modal", true);
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
        Author Management
      </h2>
      <div style={{ flexGrow: 1, maxWidth: 800 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by name..."
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
      <Button variant="contained" color="primary" onClick={addAuthor}>
        + ADD AUTHOR
      </Button>
    </div>
  );
}
