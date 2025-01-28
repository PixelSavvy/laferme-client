import { AxiosResponse } from "axios";

export type BaseResponse<T> = AxiosResponse<T> & {
  message: string;
  data: T;
};

export type GetEntities<T> = BaseResponse<T>;
export type GetEntity<T> = BaseResponse<T>;
export type AddEntity<T> = BaseResponse<T>;
export type UpdateEntity<T> = BaseResponse<T>;
export type DeleteEntity = BaseResponse<null>;
