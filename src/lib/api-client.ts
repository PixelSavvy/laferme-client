import axios, { InternalAxiosRequestConfig } from "axios";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) config.headers.Accept = "application/json";

  config.withCredentials = true;
  return config;
};
const handleAxiosError = async (error: unknown): Promise<never> => {
  if (axios.isAxiosError(error)) {
    // Reject with error response data or default error message if response is unavailable
    return Promise.reject(error.response?.data || error.message);
  }
  return Promise.reject(error);
};

const api = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

export { api, handleAxiosError };
