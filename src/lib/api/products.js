import { axiosServerInstance } from ".";

const products = {
  getAll: async () => (await axiosServerInstance.get("/products")).data,
  getOne: async (id) => (await axiosServerInstance.get(`/products/${id}`)).data,
};

export default products;
