import { BadgeVariant } from "@/components/ui";
import { useCallback } from "react";

type UseStatusProps = {
  data: object;
  status?: string;
};

export const useStatus = ({ data, status }: UseStatusProps) => {
  const convertStatus = useCallback((val: string) => {
    let label: string = "";

    if (val === "ACCEPTED") label = "მიღებული";
    if (val === "PREPARING") label = "მზადდება";
    if (val === "PREPARED") label = "დამზადებული";
    if (val === "READYTODELIVER") label = "მისატანი";
    if (val === "DELIVERING") label = "გზაშია";
    if (val === "DELIVERED") label = "მიტანილი";
    if (val === "CANCELLED") label = "გაუქმებული";
    if (val === "RETURNED") label = "მობრუნებული";

    return label;
  }, []);

  // Tranform statuses object to array of objects with value, variant and label
  const AllStatuses = Object.entries(data).map(([key, value]) => {
    const variant = {
      value: value as string,
      variant: key.toLowerCase() as BadgeVariant,
      label: convertStatus(key),
    };

    return variant;
  });

  // Filter for current status
  const currentStatus = AllStatuses.find((variant) => variant.value === status);

  // Statuses without current status
  const filteredStatuses = AllStatuses.filter(
    (variant) => variant.value !== currentStatus?.value,
  );

  return { currentStatus, filteredStatuses, AllStatuses };
};
