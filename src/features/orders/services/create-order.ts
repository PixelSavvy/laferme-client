import { useDrawer } from "@/hooks";
import { AddEntity } from "@/shared/types";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddOrder } from "../api";
import { NewOrder } from "../schema";

export const useCreateOrder = () => {
  const { mutate: addOrder, isPending: isOrderAdding } = useAddOrder();
  const { toggleDrawer } = useDrawer();

  const onSuccessCreate = (data: AddEntity<NewOrder>) => {
    toast.message(data.data.message);
    toggleDrawer();
  };

  const create: SubmitHandler<NewOrder> = (payload) => {
    const transformedPayload = {
      ...payload,
      customerId: payload.customer.id,
    };

    addOrder(
      {
        data: transformedPayload,
      },
      { onSuccess: onSuccessCreate },
    );
  };

  return {
    create,
    isOrderAdding,
  };
};
