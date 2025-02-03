import { axiosServerInstance } from ".";

const products = {
  getAll: async () => (await axiosServerInstance.get("/products")).data,
};

export default products;
