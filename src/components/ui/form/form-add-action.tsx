import { cn } from "@/lib";
import { FieldValues, UseFormReturn } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "../button";
import { DrawerClose } from "../drawer";

type FormAddActionProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isAdding: boolean;
  className?: string;
};

export const FormAddAction = <T extends FieldValues>({
  form,
  isAdding,
  className,
}: FormAddActionProps<T>) => {
  const handleCancel = () => {
    form.reset();
  };

  return (
    <div
      className={cn(
        "gap-2 w-full flex justify-end items-center mt-auto pb-4",
        className
      )}
    >
      <Button type="submit" disabled={isAdding}>
        {isAdding && <ClipLoader color="white" size={16} className="mr-1" />}
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
