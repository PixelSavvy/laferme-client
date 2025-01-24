import { AddEntity } from "@/shared/types";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddSurplus } from "../api";
import { NewSurplus } from "../schema";

export const useCreateSurplus = () => {
  const { mutate: add, isPending: isSurplusAdding } = useAddSurplus();

  const onSuccessCreate = (data: AddEntity<NewSurplus>) => {
    toast.message(data.data.message);
  };

  const create: SubmitHandler<NewSurplus> = (payload) => {
    add(
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
    isSurplusAdding,
  };
};
