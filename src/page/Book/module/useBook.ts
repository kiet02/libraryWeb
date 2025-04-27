import { ApiKeys, fetchApi } from "@/fetchApi/FetchApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useBook = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const result = useQuery({
    queryKey: [ApiKeys.allBook, page], // 👈 dùng key riêng cho books
    queryFn: fetchApi.getAllBooks({ page, limit, search }),
    select: (data) => ({
      books: data?.result, // Dữ liệu sách
      pagination: data?.pagination, // Dữ liệu phân trang
    }),
    placeholderData: keepPreviousData,
  });

  return result;
};
