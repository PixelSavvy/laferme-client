import { Row } from "@tanstack/react-table";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Separator,
} from "@/components/ui";
import { Order } from "@/features/orders";
import { Phone } from "lucide-react";

type DistributionOTPVerificationProps = {
  row: Row<Order>;
};

export const DistributionOTPVerification = ({
  row,
}: DistributionOTPVerificationProps) => {
  return (
    <Card className="shadow-none border-none ">
      <CardHeader className="items-center gap-4">
        <div className="bg-primary text-background rounded-full p-4 size-20 flex justify-center items-center">
          <Phone size={36} />
        </div>
        <CardTitle>
          <h2>შეამოწმეთ თქვენი მობილური</h2>
        </CardTitle>
        <CardDescription className="text-foreground text-center text-lg text-neutral-600">
          შეიყვანეთ 4-ნიშნა ვერიფიკაციის კოდი, რომელიც გამოგეგზავნათ ნომერზე:{" "}
          <span className="text-blue-500 font-medium">
            {row.original.customer.contactPerson.phone}
          </span>
        </CardDescription>
      </CardHeader>
      <Separator orientation="horizontal" className="max-w-xs mx-auto my-2" />
      <CardContent className="mt-8">
        <InputOTP maxLength={4}>
          <InputOTPGroup className="gap-4 mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <InputOTPSlot
                index={index}
                key={index}
                className="rounded-md size-16 text-lg"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="flex justify-center items-center gap-1 text-sm">
          <p>არ მოგივიდათ კოდი?</p>
          <Button variant={"link"} className="px-0 text-blue-500">
            მოითხოვე ახალი კოდი
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center p-0 gap-2 mt-10">
        <Button size={"lg"}>ვერიფიკაცია</Button>
      </CardFooter>
    </Card>
  );
};
