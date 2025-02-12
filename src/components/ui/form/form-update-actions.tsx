import { Button, DeleteAlertDialog } from "@/components/ui";
import { Edit, Save } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

type FormUpdateActionsProps = {
  isUpdating: boolean;

  onRemove?: (id: string) => void;
  isRemoving?: boolean;

  isFormDisabled: boolean;
  onFormDisable?: Dispatch<SetStateAction<boolean>>;
};

export const FormUpdateActions = (props: FormUpdateActionsProps) => {
  const { isUpdating, isRemoving, onRemove, isFormDisabled, onFormDisable } =
    props;

  const form = useFormContext();

  const handleDisabled = () => {
    if (onFormDisable) {
      onFormDisable(false);
    }
  };
  const handleCancel = () => {
    form.reset();
    if (onFormDisable) {
      onFormDisable(true);
    }
  };

  const handleDelete = () => {
    const id = form.getValues("id");

    if (onRemove) {
      onRemove(id);
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
            onRemove={handleDelete}
            isRemoving={isRemoving ?? false}
            disabled={!showEditActions}
          />
        </>
      )}
      {!showEditActions && (
        <>
          <Button type="submit" disabled={isUpdating || !isFormEdited}>
            <span className="flex justify-center items-center gap-2">
              {isUpdating ? (
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
            disabled={isUpdating}
            type="reset"
          >
            გაუქმება
          </Button>
        </>
      )}
    </div>
  );
};
