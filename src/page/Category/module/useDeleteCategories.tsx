import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategories = () => {
  return useMutation({
    mutationFn: (id: number | string) => fetchApi.DeteleCategories(id),
  });
};
