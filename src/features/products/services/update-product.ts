import { RowSelectionState } from "@tanstack/react-table";
import { toast } from "sonner";

import { UpdateEntity } from "@/shared/types";

import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { getProductsQueryOptions, useUpdateProduct as useUpdate } from "../api";
import { Product } from "../schema";

export const useUpdateProduct = ({
  onRowSelect,
}: {
  onRowSelect: Dispatch<SetStateAction<RowSelectionState>>;
}) => {
  const { mutate: updateProduct } = useUpdate();
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
