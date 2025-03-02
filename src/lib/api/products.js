import { axiosServerInstance } from ".";

const products = {
  getAllActiveProducts: async () =>
    (await axiosServerInstance.get("/products/active")).data,
  getOne: async (id) => (await axiosServerInstance.get(`/products/${id}`)).data,
};

export default products;
