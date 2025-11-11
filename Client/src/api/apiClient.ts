import axios from "axios";
import { LoginResponse } from "@hooks/users/auth/useLoginMutation.ts";

export const apiUrl = import.meta.env.VITE_API_URL + "/api";

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
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url.includes("/users/refresh")
    ) {
      localStorage.removeItem("refresh-token");
      sessionStorage.removeItem("token");
    }

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url.includes("/users/refresh") ||
      (sessionStorage.getItem("token") === null &&
        localStorage.getItem("refresh-token") === null)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await apiClient.post<LoginResponse>("/users/refresh", {
        refreshToken: localStorage.getItem("refresh-token"),
      });
      const { token, refreshToken } = response.data;

      sessionStorage.setItem("token", token);
      localStorage.setItem("refresh-token", refreshToken);
    } catch {
      localStorage.removeItem("refresh-token");
      sessionStorage.removeItem("token");
      return Promise.reject(error);
    }
  }
);

export default apiClient;
