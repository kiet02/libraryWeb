import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useBookAdd = () => {
  return useMutation({
    mutationFn: (formData: FormData) => fetchApi.addBook(formData),
  });
};
