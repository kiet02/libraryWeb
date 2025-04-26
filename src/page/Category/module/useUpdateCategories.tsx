import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCategories = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string | number; name: string }) =>
      fetchApi.UpdateCategories(id, name),
  });
};
