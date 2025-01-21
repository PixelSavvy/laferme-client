import { AxiosResponse } from "axios";

export type BaseResponse<T> = {
  message: string;
  data: T;
};

export type GetEntities<T> = AxiosResponse<BaseResponse<T>>;

export type GetEntity<T> = AxiosResponse<BaseResponse<T>>;

export type AddEntity<T> = AxiosResponse<BaseResponse<T>>;

export type UpdateEntity<T> = AxiosResponse<BaseResponse<T>>;

export type DeleteEntity<T> = AxiosResponse<BaseResponse<T>>;

export type ErrorApiResponse<T> = AxiosResponse<BaseResponse<T>>;
