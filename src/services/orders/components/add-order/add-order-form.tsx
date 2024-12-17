import { Dispatch, SetStateAction } from "react";

type AddOrderFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddOrderForm = ({ setIsOpen }: AddOrderFormProps) => {
  console.log(setIsOpen);
  return <div>AddOrderForm</div>;
};
