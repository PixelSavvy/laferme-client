import { appPaths } from "@/config";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  config.withCredentials = true;

  return config;
};

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : import.meta.env.VITE_API_URL,
});

// Add request interceptor
api.interceptors.request.use(authRequestInterceptor);

// Add response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = appPaths.auth.login.getHref(redirectTo);
    }
    return Promise.reject(error);
  },
);

export { api };
