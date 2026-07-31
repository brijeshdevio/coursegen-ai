import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (res) => {
    res.data = { ...res.data.data, ...res.data, data: null };
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);
