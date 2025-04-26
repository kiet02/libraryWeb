import { ApiKeys, fetchApi } from "@/fetchApi/FetchApi";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const result = useQuery({
    queryKey: [ApiKeys.AllCategories],
    queryFn: fetchApi.AllCategories,
  });

  return result;
};
