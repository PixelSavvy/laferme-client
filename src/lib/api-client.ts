import axios, { InternalAxiosRequestConfig } from "axios";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) config.headers.Accept = "application/json";

  config.withCredentials = true;
  return config;
};

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

export { api };
