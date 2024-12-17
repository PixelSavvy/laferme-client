import { Badge } from "@/components/ui";
import { DistributionItem } from "../../validations";

type DistributionTableStatusCellProps = {
  distributiontatus: DistributionItem["status"];
};

export const DistributionTableStatusCell = ({
  distributiontatus,
}: DistributionTableStatusCellProps) => {
  const statussStyles = {
    TODELIVER: {
      variant: "info",
      text: "მზადაა",
    },
    DELIVERING: {
      variant: "success",
      text: "დისტრიბუციაში",
    },
    DELIVERED: {
      variant: "danger",
      text: "მიტანილი",
    },
  } as const;

  const status =
    statussStyles[distributiontatus as unknown as keyof typeof statussStyles];

  if (!status) return null;

  return <Badge variant={status.variant}>{status.text}</Badge>;
};
