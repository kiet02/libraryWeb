import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useUserCreateAccount = () => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      role,
      adminCode,
    }: {
      name: string;
      email: string;
      password: string;
      role: "user" | "moderator";
      adminCode?: string;
    }) => fetchApi.register(name, email, password, role, adminCode),
  });
};
