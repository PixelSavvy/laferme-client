import { Button, DeleteAlertDialog } from "@/components/ui";
import { Edit, Save } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

type FormActionsProps<T extends FieldValues> = {
  form: UseFormReturn<T>;

  isProcessing: boolean;

  onDelete?: () => void;
  isDeleting?: boolean;

  isFormDisabled: boolean;
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>;
};

export const FormActions = <T extends FieldValues>(
  props: FormActionsProps<T>
) => {
  const {
    form,
    isProcessing,
    isDeleting,
    onDelete,
    isFormDisabled,
    setIsFormDisabled,
  } = props;

  const handleDisabled = () => {
    setIsFormDisabled((prev) => !prev);
  };
  const handleCancel = () => {
    form.reset();
    setIsFormDisabled((prev) => !prev);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const showEditActions = isFormDisabled;
  const isFormEdited = form.formState.isDirty;

  return (
    <div className="flex justify-between items-center gap-2 mt-8 col-span-full justify-self-end">
      {/* Form Update Action */}
      {showEditActions && (
        <>
          {/* Form Edit Action */}
          <Button type="button" onClick={handleDisabled}>
            <span className="flex justify-center items-center gap-2">
              <Edit />
              რედაქტირება
            </span>
          </Button>

          {/* Form Delete Action */}
          <DeleteAlertDialog
            deleteFn={handleDelete}
            isPending={isDeleting ?? false}
            isDisabled={isFormDisabled}
          />
        </>
      )}
      {!showEditActions && (
        <>
          <Button type="submit" disabled={isProcessing || !isFormEdited}>
            <span className="flex justify-center items-center gap-2">
              {isProcessing ? (
                <ClipLoader className="inline-flex" size={16} color="white" />
              ) : (
                <Save className="inline-flex" />
              )}
              შენახვა
            </span>
          </Button>

          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            გაუქმება
          </Button>
        </>
      )}
    </div>
  );
};
