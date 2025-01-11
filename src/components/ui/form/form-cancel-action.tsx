import { Button } from "../button/button";

type FormCancelActionProps = {
  cancelFn: () => void;
};

export const FormCancelAction = ({ cancelFn }: FormCancelActionProps) => {
  return (
    <Button variant={"ghost"} type="button" onClick={cancelFn}>
      გაუქმება
    </Button>
  );
};
