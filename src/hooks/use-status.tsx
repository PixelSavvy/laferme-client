import { BadgeVariant } from "@/components/ui";

type UseStatusProps = {
  data: object;
  status: string;
};

export const convertStatus = (val: string) => {
  let label: string = "";

  if (val === "1000") label = "მიღებული";
  if (val === "1001") label = "მზადდება";
  if (val === "1002") label = "დამზადებული";
  if (val === "1003") label = "მისატანი";
  if (val === "1004") label = "გზაშია";
  if (val === "1005") label = "მიტანილი";
  if (val === "1006") label = "გაუქმებული";
  if (val === "1007") label = "მობრუნებული";

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
    (variant) => variant.value === status,
  ) ?? {
    value: status,
    label: convertStatus(status),
    variant: null,
  };

  // Statuses without current status
  const filteredStatuses = AllStatuses.filter(
    (variant) => variant.value !== currentStatus?.value,
  );

  return { currentStatus, filteredStatuses, AllStatuses };
};
