import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
} from "@/components/ui";
import { apiPaths } from "@/config";
import { DownloadButton } from "@/features/excel";
import { SurplusTable, useSurplusColumns } from "@/features/surplus";
import { getSurplusesQueryOptions, useSurpluses } from "@/features/surplus/api";
import { cn } from "@/lib";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getSurplusesQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const SurplusRoute = () => {
  const { data: surplusData } = useSurpluses();
  const columns = useSurplusColumns();

  const [collapsedStates, setCollapsedStates] = useState<
    Record<string, boolean>
  >({
    fresh: true,
    medium: false,
    old: false,
    expired: false,
  });

  const handleToggle = (key: string) => {
    setCollapsedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const surplusList = useMemo(() => {
    if (!surplusData?.data) {
      return { fresh: [], medium: [], old: [], expired: [] };
    }

    return surplusData.data;
  }, [surplusData]);

  const fallback = "პროდუქტები ვერ მოიძებნა";

  return (
    <ContentLayout title="მიმდინარე ნაშთი">
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">ნაშთი</h1>
          <span className="text-neutral-600 text-sm">
            ნაშთის ცხრილის აღწერა
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <DownloadButton url={apiPaths.excel.surplus} />
          <Separator orientation="vertical" className="h-8" />
        </div>

        <Separator className="col-span-full" />
      </div>

      {/* Single Table Header */}
      <SurplusTable columns={columns} data={[]} />

      {/* Collapsible Content */}
      {Object.entries(surplusList).map(([key, surplusItems]) => (
        <Collapsible
          key={key}
          open={Boolean(collapsedStates[key])}
          onOpenChange={() => handleToggle(key)}
        >
          <CollapsibleTrigger
            className={cn(
              "w-full p-4 text-left flex items-center gap-2 hover:bg-neutral-100 transition-all",
              collapsedStates[key] ? "border-none" : "border-b"
            )}
          >
            {/* Collapsible Item Label */}
            <h2 className="font-semibold text-sm">
              {key === "fresh"
                ? "ახალი (48 - 72 სთ.)"
                : key === "medium"
                  ? "საშუალო (24 - 48 სთ.)"
                  : key === "old"
                    ? "ძველი (0 - 24 სთ.)"
                    : "ვადაგასული"}
            </h2>

            {/* Collapsible Arrow */}
            <ChevronDown
              size={20}
              className={cn(
                collapsedStates[key] ? "-rotate-180" : "rotate-0",
                "transition-transform"
              )}
            />
            <Badge
              className="size-5 flex place-content-center ml-auto"
              variant={
                !surplusItems.length
                  ? "secondary"
                  : key === "expired"
                    ? "cancelled"
                    : "default"
              }
            >
              <span>{surplusItems.length}</span>
            </Badge>
          </CollapsibleTrigger>

          <CollapsibleContent className="py-2">
            <SurplusTable
              data={surplusItems.flatMap((item) => item.products)} // Flatten products arrays for the table
              columns={columns}
              fallback={fallback}
              renderHeader={false}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </ContentLayout>
  );
};

export default SurplusRoute;
