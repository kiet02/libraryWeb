import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAuthor = () => {
  return useMutation({
    mutationFn: (id: number | string) => fetchApi.DeleteAuthor(id),
  });
};
