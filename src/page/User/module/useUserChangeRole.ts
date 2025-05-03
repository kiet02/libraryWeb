import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useUserChangeRole = () => {
  return useMutation({
    mutationFn: ({
      id,
      newRole,
      adminCode,
    }: {
      id: string | number;
      newRole: "user" | "moderator";
      adminCode: string;
    }) => fetchApi.changeRole(id, newRole, adminCode),
  });
};
