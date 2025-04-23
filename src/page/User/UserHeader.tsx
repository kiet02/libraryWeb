import { TUser } from "@/help/type";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type TUserHeader = {
  users: TUser[];
  setFilteredUsers: (value: TUser[]) => void;
};

export function UserHeader({ users, setFilteredUsers }: TUserHeader) {
  const [searchTerm, setSearchTerm] = useState("");
  const { setValue, reset } = useFormContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const addUser = () => {
    reset();
    setValue("updateUser", false);
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
        User Management
      </h2>
      <div style={{ flexGrow: 1, maxWidth: 800 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by username, email..."
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
      <Button variant="contained" color="primary" onClick={addUser}>
        + ADD USER
      </Button>
    </div>
  );
}
