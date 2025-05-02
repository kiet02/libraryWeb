import { fetchApi } from "@/fetchApi/FetchApi";
import { TChapter } from "@/fetchApi/type";
import { useMutation } from "@tanstack/react-query";

export const useChapterAdd = () => {
  return useMutation({
    mutationFn: ({
      id,
      chapter,
    }: {
      id: string | number;
      chapter: TChapter[];
    }) => fetchApi.addChapter(id, chapter),
  });
};
