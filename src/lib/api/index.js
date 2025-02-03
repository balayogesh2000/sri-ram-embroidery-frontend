import axios from "axios";
import products from "./products";
import enquiries from "./enquiries";

export const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const api = {
  products,
  enquiries,
};

export default api;
