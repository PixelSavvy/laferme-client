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

import ClipLoader from "react-spinners/ClipLoader";

type DeleteAlertDialogProps = {
  deleteFn: () => void;
  isPending: boolean;
  isDisabled?: boolean;
  className?: string;
};

export const DeleteAlertDialog = ({
  deleteFn,
  isPending,
  isDisabled,
  className,
}: DeleteAlertDialogProps) => {
  const alertDialogActionLabel = isPending ? (
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
          variant={"destructive"}
          type="button"
          disabled={isDisabled}
          className={className}
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
            <Button onClick={deleteFn} type="button" variant="destructive">
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
