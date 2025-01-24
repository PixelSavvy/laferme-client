import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { AddEntity } from "@/shared/types";
import { NewSurplus } from "../schema";
import { getSurplusesQueryOptions } from "./get-surpluses";

export const addSurplus = ({
  data,
}: {
  data: NewSurplus;
}): Promise<AddEntity<NewSurplus>> => {
  const path = apiPaths.app.surplus;
  return api.post(path, data);
};

type UseAddSurplusOptions = {
  mutationConfig?: MutationConfig<typeof addSurplus>;
};

export const useAddSurplus = ({
  mutationConfig,
}: UseAddSurplusOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getSurplusesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addSurplus,
  });
};
