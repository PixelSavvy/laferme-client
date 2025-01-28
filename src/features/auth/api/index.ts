import { configureAuth, type ReactQueryAuthConfig } from "react-query-auth";

import { apiPaths } from "@/config";
import { User } from "@/features/user";
import { api } from "@/lib";
import { Login, Register } from "../schema";

const login = (data: Login) => {
  return api.post(apiPaths.auth.login, data);
};

const register = (data: Register) => {
  return api.post(apiPaths.auth.register, data);
};

const logout = () => {
  return api.post(apiPaths.auth.logout);
};

const getUser = (): Promise<User> => {
  return api.get(apiPaths.auth.me);
};

const authConfig: ReactQueryAuthConfig<User, Login, Register> = {
  userFn: getUser,
  loginFn: async (data) => {
    const response = await login(data);
    return response.data;
  },
  registerFn: async (data) => {
    const response = await register(data);
    return response.data;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister } =
  configureAuth(authConfig);
