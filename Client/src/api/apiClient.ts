import axios from "axios";
import { LoginResponse } from "../hooks/useLoginMutation";

export const apiUrl = import.meta.env.DEV
  ? "http://localhost:5006/api"
  : "/api";

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (request) => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      request.headers.Authorization = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status !== 401 || originalRequest._retry)
      return Promise.reject(error);

    originalRequest._retry = true;

    try {
      const response = await apiClient.post<LoginResponse>("/users/refresh");
      const { token } = response.data;

      sessionStorage.setItem("token", token);
    } catch {
      return Promise.reject(error);
    }
  },
);

export default apiClient;
