const http = "http://localhost:3000";
const Apis = {
  login: `${http}/api/users/login`,
  register: `${http}/api/users/register`,
  getUser: `${http}/api/users/profile`,
  getChangePassword: `${http}/api/users/change-password`,
  getExplore: `${http}/api/books/explore/random`,
  getCategoris: (name: string) => `${http}/api/genres/${name}`,
  getAllCategoris: `${http}/api/genres/all`,
  deleteCategoris: (id: number | string) => `${http}/api/genres/${id}`,
  addCategoris: `${http}/api/genres/`,
  updateCategoris: (id: string | number) => `${http}/api/genres/${id}`,
  getAuthor: `${http}/api/authors`,
  addAuthor: `${http}/api/authors/create`,
  updateAuthor: (id: number | string) => `${http}/api/authors/${id}`,
  deleterAuthor: (id: number | string) => `${http}/api/authors/${id}`,
};
export { Apis };
