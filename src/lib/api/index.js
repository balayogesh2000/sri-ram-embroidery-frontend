import axios from "axios";
import products from "./products";
import enquiries from "./enquiries";
import collections from "./collections";

export const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const api = {
  products,
  enquiries,
  collections,
};

export default api;
