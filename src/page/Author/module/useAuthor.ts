import { ApiKeys, fetchApi } from "@/fetchApi/FetchApi";
import { useQuery } from "@tanstack/react-query";

export const useAuthor = () => {
  const result = useQuery({
    queryKey: [ApiKeys.allAuthor],
    queryFn: fetchApi.AllAuthor,
  });

  return result;
};
