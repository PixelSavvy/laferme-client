import { Row } from "@tanstack/react-table";
import { useState } from "react";

import { Button, Dialog, DialogContent, DialogTrigger } from "@/components/ui";
import { Order } from "@/features/orders";
import { DistributionOTPVerification } from "./distribution-otp-verification";
import { DistributionItemRowExpanded } from "./distribution-table-row-expanded";

type DistributionTableDeliveredTriggerProps = {
  row: Row<Order>;
};

export const DistributionTableDeliveredTrigger = ({
  row,
}: DistributionTableDeliveredTriggerProps) => {
  const [verifyOTP, setVerifyOTP] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>დასრულება</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl h-3/4 overflow-y-scroll">
        {!verifyOTP ? (
          <DistributionItemRowExpanded
            row={row}
            verifyOTP={verifyOTP}
            onVerifyOTP={setVerifyOTP}
          />
        ) : (
          <DistributionOTPVerification row={row} />
        )}
      </DialogContent>
    </Dialog>
  );
};
