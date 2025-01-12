import { Badge } from "@/components/ui";
import { useStatus } from "@/hooks";

type OrderStatusTriggerProps = {
  status: string;
  data: Record<string, string>;
};

export const StatusCell = ({ status, data }: OrderStatusTriggerProps) => {
  const { currentStatus } = useStatus({
    data,
    status,
  });

  return <Badge status={currentStatus?.variant}>{currentStatus?.label}</Badge>;
};
