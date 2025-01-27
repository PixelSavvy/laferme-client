import { DeleteEntity } from "@/shared/types";
import { toast } from "sonner";
import { useDeleteProduct } from "../api";

export const useRemoveProduct = () => {
  const { mutate: deleteProduct, isPending: isRemoving } = useDeleteProduct();

  const onDeleteSuccess = async (data: DeleteEntity) => {
    toast.message(data.data.message);
  };

  const remove = (id: number) => {
    deleteProduct(
      {
        id,
      },
      { onSuccess: onDeleteSuccess },
    );
  };

  return {
    remove,
    isRemoving,
  };
};
