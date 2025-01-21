import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { UpdateEntity } from "@/shared/types";
import { Row } from "@tanstack/react-table";
import {
  getOrdersQueryOptions,
  useUpdateOrder as useUpdateMutation,
} from "../api";
import { Order } from "../schema";

export const useUpdateOrder = ({ row }: { row: Row<Order> }) => {
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateMutation();

  const queryClient = useQueryClient();

  const onSuccessUpdate = (data: UpdateEntity<Order>) => {
    toast.message(data.data.message);
    row.toggleExpanded();

    queryClient.invalidateQueries({
      queryKey: getOrdersQueryOptions().queryKey,
    });
  };

  const update: SubmitHandler<Order> = (payload) => {
    console.log(payload.products);
    updateOrder(
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
