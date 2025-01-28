import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { UpdateEntity } from "@/shared/types";
import { Row } from "@tanstack/react-table";
import {
  getCustomersQueryOptions,
  useUpdateCustomer as useUpdateMutation,
} from "../api";
import { Customer } from "../schema";

export const useUpdateCustomer = ({ row }: { row: Row<Customer> }) => {
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateMutation();

  const queryClient = useQueryClient();

  const onSuccessUpdate = (data: UpdateEntity<Customer>) => {
    toast.message(data.message);
    row.toggleExpanded();

    queryClient.invalidateQueries({
      queryKey: getCustomersQueryOptions().queryKey,
    });
  };

  const update: SubmitHandler<Customer> = (payload) => {
    updateCustomer(
      {
        id: payload.id,
        data: payload,
      },
      { onSuccess: onSuccessUpdate },
    );
  };

  return {
    update,
    isUpdating,
  };
};
