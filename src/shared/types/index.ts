export type BaseResponse = {
  message?: string;
};

export type GetEntities<T> = BaseResponse & {
  data: T[];
};

export type GetEntity<T> = BaseResponse & {
  data: T;
};

export type AddEntity = BaseResponse;

export type UpdateEntity<T> = BaseResponse & {
  id: number;
  data: T;
};

export type DeleteEntity = BaseResponse;

export type ErrorApiResponse = BaseResponse;
