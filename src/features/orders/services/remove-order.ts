import { DeleteEntity } from "@/shared/types";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { useDeleteOrder } from "../api";
import { Order } from "../schema";

export const useRemoveOrder = ({ row }: { row: Row<Order> }) => {
  const { mutate: deleteOrder, isPending: isRemoving } = useDeleteOrder();

  const onSuccessDelete = (data: DeleteEntity) => {
    toast.message(data.data.message);
    row.toggleExpanded();
  };

  const remove = (id: number) => {
    deleteOrder(
      {
        id,
      },
      {
        onSuccess: onSuccessDelete,
      },
    );
  };

  return {
    remove,
    isRemoving,
  };
};
