import { TAuthor, TCategory } from "@/help/type";
import { Apis } from "./Apis";
import { TBook, TChapter, TGenre, TUser } from "./type";

const tokenTest =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ2MjAxNjExLCJleHAiOjE3NDYyODgwMTF9.D2kGI4LOxXHM_BYG0_QMNy1L5o73FyzHvWxkskz4rAA";
const commonCall = async <T>(
  api: string,
  option: RequestInit = {}
): Promise<T> => {
  //   const account = AccountService.get();

  try {
    // if(!account?.token) {
    //   throw new Error('Account not found')
    // }
    let headers = {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${tokenTest}`,
    };

    const response = await fetch(api, {
      headers: headers,
      ...option,
    });

    return response.json();
  } catch (error: any) {
    if (error.message === "Network request failed") {
      throw new Error("Network request failed");
    }
    throw error;
  }
};

const fetchApi = {
  login: (email: string, password: string) => {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password }),
    };
    const response = commonCall<TUser>(Apis.login, option);
    return response;
  },
  register: (name: string, email: string, password: string) => {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    };
    const response = commonCall<TUser>(Apis.register, option);
    return response;
  },
  AllCategories: () => {
    const option: RequestInit = {
      method: "GET",
      // body: JSON.stringify({name})
    };
    const response = commonCall<TCategory[]>(Apis.getAllCategoris, option);
    return response;
  },
  DeteleCategories: (id: number | string) => {
    const option: RequestInit = {
      method: "DELETE",
      body: JSON.stringify({ id }),
    };
    const response = commonCall<TCategory[]>(Apis.deleteCategoris(id), option);
    return response;
  },
  AddCategories: (name: string) => {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify({ name }),
    };
    const response = commonCall<TCategory[]>(Apis.addCategoris, option);
    return response;
  },
  UpdateCategories: (id: string | number, name: string) => {
    const option: RequestInit = {
      method: "PUT",
      body: JSON.stringify({ name }),
    };
    const response = commonCall<TCategory[]>(Apis.updateCategoris(id), option);
    return response;
  },
  AllAuthor: () => {
    const option: RequestInit = {
      method: "GET",
    };
    const response = commonCall<TAuthor[]>(Apis.getAuthor, option);
    return response;
  },
  UpdateAuthor: (id: string | number, formData: FormData) => {
    const option: RequestInit = {
      method: "PUT",
      body: formData,
    };
    const response = commonCall<TAuthor[]>(Apis.updateAuthor(id), option);
    return response;
  },
  AddAuthor: (formData: FormData) => {
    const option: RequestInit = {
      method: "POST",
      body: formData,
    };
    const response = commonCall<TAuthor[]>(Apis.addAuthor, option);
    return response;
  },
  DeleteAuthor: (id: string | number) => {
    const option: RequestInit = {
      method: "DELETE",
    };
    const response = commonCall<TAuthor[]>(Apis.deleterAuthor(id), option);
    return response;
  },
  getAllBooks:
    ({
      page = 1,
      limit = 10,
      search = "",
    }: {
      page: number;
      limit: number;
      search: string;
    }) =>
    () => {
      const url = `${
        Apis.getBooks
      }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`; // Thêm search vào URL

      const option: RequestInit = {
        method: "GET", // Phương thức GET không cần body
        headers: {
          "Content-Type": "application/json", // Đảm bảo kiểu dữ liệu là JSON
        },
      };

      return commonCall<{
        result: TBook[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
          hasNext: boolean;
          hasPrevious: boolean;
        };
      }>(url, option); // Truyền URL với query parameters vào commonCall
    },
  addBook: (formData: FormData) => {
    const option: RequestInit = {
      method: "POST",
      body: formData,
    };
    const response = commonCall<TBook>(Apis.addBook, option);
    return response;
  },
  updateBook: (id: number | string, formData: FormData) => {
    const option: RequestInit = {
      method: "PUT",
      body: formData,
    };
    const response = commonCall<TBook>(Apis.updateBook(id), option);
    return response;
  },
  deleteBook: (id: string | number) => {
    const option: RequestInit = {
      method: "DELETE",
    };
    const response = commonCall<TBook[]>(Apis.deleteBook(id), option);
    return response;
  },
  getChapter: (id: string | number) => () => {
    const option: RequestInit = {
      method: "GET",
      // body: JSON.stringify({name})
    };
    const response = commonCall<TChapter[]>(Apis.getChapter(id), option);
    return response;
  },
  addChapter: (id: string | number, chapter: TChapter[]) => {
    const option: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đảm bảo kiểu dữ liệu là JSON
        Authorization: `Bearer ${tokenTest}`,
      },
      body: JSON.stringify(chapter), // Sử dụng test data đã chắc chắn
    };
    const response = commonCall<TChapter[]>(Apis.addChapter(id), option);
    return response;
  },
  updateChapter: (id: number | string, chapter: TChapter[]) => {
    const option: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Đảm bảo kiểu dữ liệu là JSON
        Authorization: `Bearer ${tokenTest}`,
      },
      body: JSON.stringify(chapter),
    };
    const response = commonCall<TBook[]>(Apis.updateChapter(id), option);
    return response;
  },
  deleteChapter: (id: string | number, idChapter: string | number) => {
    const option: RequestInit = {
      method: "DELETE",
    };
    const response = commonCall<TBook[]>(
      Apis.deleteChapter(id, idChapter),
      option
    );
    return response;
  },
};

const ApiKeys = {
  login: "login",
  register: "register",
  explore: "explore",
  categories: "categories",
  AllCategories: "AllCategories",
  user: "user",
  allAuthor: "author",
  allBook: "book",
  allChapter: "chapter",
};
export { fetchApi, ApiKeys };
