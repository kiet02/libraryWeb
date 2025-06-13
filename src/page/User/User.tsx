import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { UserDialog } from "./UserDialog";
import { UserHeader } from "./UserHeader";

import { useUser } from "./module/useUser";
import { UserDelete } from "./UserDelete";

export function Users() {
  const methods = useForm();

  const [page] = useState(1);
  const [search, setSearch] = useState("");

  const { data, refetch } = useUser({ page, limit: 10, search });

  useEffect(() => {
    refetch();
  }, [search, page]);
  return (
    <FormProvider {...methods}>
      <UserHeader setSearch={setSearch} />
      <UserCard users={data?.user || []} refetch={refetch} />
      <UserDialog refetch={refetch} />
      <UserDelete refetch={refetch} />
    </FormProvider>
  );
}
