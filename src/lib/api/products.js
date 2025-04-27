import { axiosServerInstance } from ".";

const products = {
  getAllProducts: async () => (await axiosServerInstance.get("/products")).data,
  getOne: async (id) => (await axiosServerInstance.get(`/products/${id}`)).data,
};

export default products;
