import { configureAuth, type ReactQueryAuthConfig } from "react-query-auth";

import { apiPaths } from "@/config";

import { Employee } from "@/features/employees";
import { api } from "@/lib";
import { BaseResponse } from "@/shared/types";
import { Login, Register } from "../schema";

const login = (data: Login) => {
  return api.post(apiPaths.auth.login, data);
};

const register = (data: Register): Promise<BaseResponse<Employee>> => {
  return api.post(apiPaths.auth.register, data);
};

const logout = () => {
  return api.post(apiPaths.auth.logout);
};

const getUser = async (): Promise<Employee> => {
  const response = await api.get(apiPaths.auth.me);

  return response.data;
};

const authConfig: ReactQueryAuthConfig<Employee, Login, Register> = {
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

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
