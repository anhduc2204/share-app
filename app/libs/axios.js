import axiosBase from "axios";
import { getTokens } from "./auth";

const axios = axiosBase.create({
  baseURL: "https://api.thuquan.top",
  timeout: 20000,
});

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(
  async (config) => {
    if (config.withAuth) {
      const token = await getTokens();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axios;
