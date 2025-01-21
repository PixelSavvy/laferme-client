import { DeleteEntity } from "@/shared/types";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { useDeleteCustomer } from "../api";
import { Customer } from "../schema";

export const useRemoveCustomer = ({ row }: { row: Row<Customer> }) => {
  const { mutate: deleteCustomer, isPending: isRemoving } = useDeleteCustomer();

  const onSuccessDelete = (data: DeleteEntity<Customer>) => {
    toast.message(data.data.message);
    row.toggleExpanded();
  };

  const remove = (id: number) => {
    deleteCustomer(
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
