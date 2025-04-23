import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { UserDialog } from "./UserDialog";
import { UserHeader } from "./UserHeader";
import { TUser } from "@/help/type";

const mockUsers: TUser[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    role: "user",
    date: "2024-01-01",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    date: "2024-02-15",
  },
];

export function Users() {
  const methods = useForm();
  const [users, setUsers] = useState<TUser[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<TUser[]>(mockUsers);

  return (
    <FormProvider {...methods}>
      <UserHeader users={users} setFilteredUsers={setFilteredUsers} />
      <UserCard users={filteredUsers} />
      <UserDialog />
    </FormProvider>
  );
}
