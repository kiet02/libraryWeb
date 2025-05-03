import { TAuthor, TCategory } from "@/help/type";
import { Apis } from "./Apis";
import { TBook, TChapter, TGenre, TUser } from "./type";
import { AccountServer } from "@/help/AccountServer/AccountServer";
import { handleToken } from "@/help/AccountServer/token";
import { json } from "stream/consumers";
const token = AccountServer.onGet().token;

const commonCall = async <T>(
  api: string,
  option: RequestInit = {}
): Promise<T> => {
  const isFormData = option.body instanceof FormData;

  const headers = {
    ...option.headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: `Bearer ${token}`, // nếu cần
  };

  const response = await fetch(api, {
    ...option,
    headers,
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Không thể parse JSON:", text);
    throw new Error("Dữ liệu trả về không hợp lệ JSON");
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
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
  loginAdmin: (email: string, password: string) => {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password }),
    };
    const response = commonCall<TUser>(Apis.loginAdmin, option);
    return response;
  },
  register: (
    name: string,
    email: string,
    password: string,
    role: "user" | "moderator",
    adminCode?: string
  ) => {
    const option: RequestInit = {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, adminCode }),
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
      body: JSON.stringify(chapter), // Sử dụng test data đã chắc chắn
    };
    const response = commonCall<TChapter[]>(Apis.addChapter(id), option);
    return response;
  },
  updateChapter: (id: number | string, chapter: TChapter[]) => {
    const option: RequestInit = {
      method: "PUT",
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

  getAllUsers:
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
        Apis.getAllUser
      }?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`; // Thêm search vào URL

      const option: RequestInit = {
        method: "GET", // Phương thức GET không cần body
      };

      return commonCall<{
        result: TUser[];
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

  changeRole: (
    id: number | string,
    newRole: "user" | "moderator",
    adminCode: string
  ) => {
    const option: RequestInit = {
      method: "PUT",
      body: JSON.stringify({ id, newRole, adminCode }),
    };
    const response = commonCall<TUser[]>(Apis.changeRole, option);
    return response;
  },
  deleteUser: (id: string) => {
    const option: RequestInit = {
      method: "DELETE",
    };
    const response = commonCall<TBook[]>(Apis.deleteUser(id), option);
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
  allUser: "user",
};
export { fetchApi, ApiKeys };
