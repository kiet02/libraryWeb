import { ApiKeys, fetchApi } from "@/fetchApi/FetchApi";
import { useQuery } from "@tanstack/react-query";

export const useChapter = (id: string | number) => {
  const result = useQuery({
    queryKey: [ApiKeys.allChapter, id],
    queryFn: fetchApi.getChapter(id),
  });

  return result;
};
