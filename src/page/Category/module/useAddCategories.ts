import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useAddCategories = () => {
  return useMutation({
    mutationFn: (name: string) => fetchApi.AddCategories(name),
  });
};
