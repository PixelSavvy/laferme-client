import { useDrawer } from "@/hooks";
import { AddEntity } from "@/shared/types";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddCustomer } from "../api";
import { NewCustomer } from "../schema";

export const useCreateCustomer = () => {
  const { mutate: addCustomer, isPending: isAddingCustomer } = useAddCustomer();

  const { toggleDrawer } = useDrawer();

  const onSuccessCreate = (data: AddEntity<NewCustomer>) => {
    toast.message(data.message);
    toggleDrawer();
  };

  const create: SubmitHandler<NewCustomer> = (payload) => {
    addCustomer(
      {
        data: payload,
      },
      {
        onSuccess: onSuccessCreate,
      },
    );
  };

  return {
    create,
    isAddingCustomer,
  };
};
