import axios from "axios";
// const BASE_URL = "https://trickedex.app/api";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
});
axios.defaults.withCredentials = true;
export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 7000,
});
