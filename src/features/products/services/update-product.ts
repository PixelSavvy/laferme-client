import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { UpdateEntity } from "@/shared/types";

import { useQueryClient } from "@tanstack/react-query";
import {
  getProductsQueryOptions,
  useUpdateProduct as useUpdateMutation,
} from "../api";
import { Product } from "../schema";

export const useUpdateProduct = ({
  onRowSelect,
}: {
  onRowSelect: Dispatch<SetStateAction<RowSelectionState>>;
}) => {
  const { mutate: updateProduct } = useUpdateMutation();
  const queryClient = useQueryClient();

  const onUpdateSuccess = async (data: UpdateEntity<Product>) => {
    onRowSelect({});
    toast.success(data.data.message);

    queryClient.invalidateQueries({
      queryKey: getProductsQueryOptions().queryKey,
    });
  };

  const update = (payload: Product) => {
    updateProduct(
      {
        id: payload.id,
        data: payload,
      },
      {
        onSuccess: (data) => onUpdateSuccess(data),
      },
    );
  };

  return {
    update,
  };
};
