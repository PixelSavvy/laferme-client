import { cn } from "@/lib";
import { FieldValues, UseFormReturn } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "../button";
import { DrawerClose } from "../drawer";

type FormAddActionsProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isProcessing: boolean;
  className?: string;
};

export const FormAddActions = <T extends FieldValues>({
  form,
  isProcessing,
  className,
}: FormAddActionsProps<T>) => {
  const handleCancel = () => {
    form.reset();
  };
  return (
    <div
      className={cn(
        "gap-2 w-full flex justify-end items-center mt-auto",
        className,
      )}
    >
      <Button type="submit" disabled={isProcessing}>
        {isProcessing && (
          <ClipLoader color="white" size={16} className="mr-1" />
        )}
        დამატება
      </Button>
      <DrawerClose asChild>
        <Button variant={"ghost"} type="reset" onClick={handleCancel}>
          გაუქმება
        </Button>
      </DrawerClose>
    </div>
  );
};
