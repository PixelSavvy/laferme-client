import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";
import { Employee } from "../schema";

const getEmployees = (): Promise<GetEntity<Employee[]>> => {
  const path = `${apiPaths.app.employee}`;
  return api.get(path);
};

export const getEmployeesQueryOptions = () => {
  return queryOptions({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

type UseOrderOptions = {
  queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>;
};

export const useEmployees = ({ queryConfig }: UseOrderOptions = {}) => {
  return useQuery({
    ...getEmployeesQueryOptions(),
    ...queryConfig,
  });
};
