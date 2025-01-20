import { DeleteEntity } from "@/shared/types";
import { toast } from "sonner";
import { useDeleteProduct as useDelete } from "../api";
import { Product } from "../schema";

export const useDeleteProduct = () => {
  const { mutate: deleteProduct, isPending: isDeleting } = useDelete();

  const onDeleteSuccess = async (data: DeleteEntity<Product>) => {
    toast.message(data.data.message);
  };

  const remove = (id: number) => {
    console.log(id);
    deleteProduct(
      {
        id,
      },
      { onSuccess: onDeleteSuccess },
    );
  };

  return {
    remove,
    isDeleting,
  };
};
