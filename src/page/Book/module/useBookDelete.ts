import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useBookDelete = () => {
  return useMutation({
    mutationFn: (id: number | string) => fetchApi.deleteBook(id),
  });
};
