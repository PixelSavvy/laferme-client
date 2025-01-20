import { Trash } from "lucide-react";
import { Button } from "../button/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

import { cn } from "@/lib";
import ClipLoader from "react-spinners/ClipLoader";
import { ButtonVariants } from "../button";

type DeleteAlertDialogProps = {
  onDelete: () => void;
  isDeleting: boolean;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
};

export const DeleteAlertDialog = ({
  onDelete,
  isDeleting,
  disabled,
  className,
  variant = "destructive",
  size = "default",
}: DeleteAlertDialogProps) => {
  const alertDialogActionLabel = isDeleting ? (
    <ClipLoader
      loading={true}
      aria-label="Loading Spinner"
      data-testid="loader"
      color="text-background"
      size={16}
    />
  ) : (
    "გაგრძელება"
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size={size}
          disabled={disabled}
          className={cn(className)}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>დარწმუნებული ხარ?</AlertDialogTitle>
          <AlertDialogDescription>
            გაგრძელების შემთვევაში მონაცემები სამუდამოდ წაიშლება პლატფორმის
            სერვერებიდან.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogAction asChild>
            <Button onClick={onDelete} type="button" variant="destructive">
              {alertDialogActionLabel}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Button variant={"outline"}>გაუქმება</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
