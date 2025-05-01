import { axiosServerInstance } from ".";

const collections = {
  getAll: async () => (await axiosServerInstance.get("/collections")).data,
  getOne: async (id) =>
    (await axiosServerInstance.get(`/collections/${id}`)).data,
};

export default collections;
