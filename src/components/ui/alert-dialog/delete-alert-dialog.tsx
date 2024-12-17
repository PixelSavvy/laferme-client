import { Trash } from "lucide-react";
import { Button } from "../button";
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
};

export const DeleteAlertDialog = ({
  deleteFn,
  isPending,
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
        <Button variant={"danger"}>
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
          <AlertDialogAction>
            <Button variant={"danger"} onClick={deleteFn}>
              {alertDialogActionLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
