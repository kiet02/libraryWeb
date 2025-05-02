import { fetchApi } from "@/fetchApi/FetchApi";
import { useMutation } from "@tanstack/react-query";

export const useChapterDelete = () => {
  return useMutation({
    mutationFn: ({
      id,
      idChapter,
    }: {
      id: number | string;
      idChapter: string | number;
    }) => fetchApi.deleteChapter(id, idChapter),
  });
};
