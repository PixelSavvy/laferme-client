import { Save } from "lucide-react";
import { Fragment } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "../button/button";

type FormSubmitActionProps = {
  isDisabled?: boolean;
  isFormDirty: boolean;
  isPending: boolean;
  show: boolean;
};

export const FormSubmitAction = ({
  isDisabled,
  isFormDirty,
  isPending,

  show,
}: FormSubmitActionProps) => {
  const submitButtonLabel = (
    <span className="flex justify-center items-center gap-2">
      {isPending ? (
        <ClipLoader className="inline-flex" size={16} color="white" />
      ) : (
        <Save className="inline-flex" />
      )}
      შენახვა
    </span>
  );

  return (
    <Fragment>
      {show && (
        <Button
          type="submit"
          disabled={isDisabled || !isFormDirty || isPending}
        >
          {submitButtonLabel}
        </Button>
      )}
    </Fragment>
  );
};
