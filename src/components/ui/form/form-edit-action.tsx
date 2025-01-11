import { Edit } from "lucide-react";
import { Button } from "../button/button";

type FormEditActionProps = {
  show: boolean;
  disableFn: () => void;
};

export const FormEditAction = ({ show, disableFn }: FormEditActionProps) => {
  const editButtonLabel = (
    <span className="flex justify-center items-center gap-2">
      <Edit />
      რედაქტირება
    </span>
  );

  return (
    show && (
      <Button type="button" onClick={disableFn}>
        {editButtonLabel}
      </Button>
    )
  );
};
