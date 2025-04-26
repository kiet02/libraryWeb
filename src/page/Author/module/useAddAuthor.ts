import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useAddAuthor = () => {
  return useMutation({
    mutationFn: (formData: FormData) => fetchApi.AddAuthor(formData),
  });
};
