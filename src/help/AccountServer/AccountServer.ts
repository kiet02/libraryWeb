// AccountServer.ts
type Account = {
  id: string;
  email: string;
  role: string;
  token: string;
};

const STORAGE_KEY = "accounts";

const getFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const AccountServer = {
  onAdd(account: Account) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  },

  onGet() {
    return getFromStorage();
  },

  onRemove() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
