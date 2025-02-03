import { axiosServerInstance } from ".";

const base = "/enquiries";

const enquiries = {
  create: async (data) => (await axiosServerInstance.post(base, data)).data,
};

export default enquiries;
