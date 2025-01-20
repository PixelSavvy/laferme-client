import { BadgeVariant } from "@/components/ui";

type UseStatusProps = {
  data: object;
  status: string;
};

export const convertStatus = (val: string) => {
  let label: string = "";

  if (val === "ACCEPTED") label = "მიღებული";
  if (val === "PREPARING") label = "მზადდება";
  if (val === "PREPARED") label = "დამზადებული";
  if (val === "DELIVERING") label = "გზაშია";
  if (val === "DELIVERED") label = "მიტანილი";
  if (val === "CANCELLED") label = "გაუქმებული";
  if (val === "RETURNED") label = "მობრუნებული";

  return label;
};

export const useStatus = ({ data, status }: UseStatusProps) => {
  // Tranform statuses object to array of objects with value, variant and label
  const AllStatuses = Object.entries(data).map(([key, value]) => {
    const variant = {
      value: value as string,
      variant: key.toLowerCase() as BadgeVariant,
      label: convertStatus(value),
    };
    return variant;
  });

  // Filter for current status
  const currentStatus = AllStatuses.find(
    (variant) => variant.value === status
  ) ?? {
    value: status,
    label: convertStatus(status),
    variant: null,
  };

  // Statuses without current status
  const filteredStatuses = AllStatuses.filter(
    (variant) => variant.value !== currentStatus?.value
  );

  return { currentStatus, filteredStatuses, AllStatuses };
};
