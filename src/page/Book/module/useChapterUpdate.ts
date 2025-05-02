import { fetchApi } from "@/fetchApi/FetchApi";
import { TChapter } from "@/fetchApi/type";
import { useMutation } from "@tanstack/react-query";

export const useChapterUpdate = () => {
  return useMutation({
    mutationFn: ({
      id,
      chapter,
    }: {
      id: string | number;
      chapter: TChapter[];
    }) => fetchApi.updateChapter(id, chapter),
  });
};
