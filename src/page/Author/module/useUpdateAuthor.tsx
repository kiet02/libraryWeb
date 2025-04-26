import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAuthor = () => {
  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string | number;
      formData: FormData;
    }) => fetchApi.UpdateAuthor(id, formData),
  });
};
