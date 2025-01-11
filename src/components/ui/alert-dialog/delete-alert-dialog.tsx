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
};

export const DeleteAlertDialog = ({
  deleteFn,
  isPending,
  isDisabled,
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
          variant={"ghost"}
          type="button"
          className="text-danger-500"
          disabled={isDisabled}
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
          <AlertDialogCancel>გაუქმება</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"danger"} onClick={deleteFn} type="button">
              {alertDialogActionLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
