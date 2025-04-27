import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useBookUpdate = () => {
  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string | number;
      formData: FormData;
    }) => fetchApi.updateBook(id, formData),
  });
};
