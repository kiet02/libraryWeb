import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useUserDelete = () => {
  return useMutation({
    mutationFn: (id: string) => fetchApi.deleteUser(id),
  });
};
