import { TAuthor, TCategory } from "@/help/type";
import { Apis } from "./Apis";
import { TGenre, TUser } from "./type";

const tokenTest =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1NTk2MTkzLCJleHAiOjE3NDU2ODI1OTN9._E8a0SOJfSlAz0upRTT4kgGFwLZbkz6V1GOFSwFtx0Y";

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
};
const ApiKeys = {
  login: "login",
  register: "register",
  explore: "explore",
  categories: "categories",
  AllCategories: "AllCategories",
  user: "user",
  allAuthor: "author",
};
export { fetchApi, ApiKeys };
