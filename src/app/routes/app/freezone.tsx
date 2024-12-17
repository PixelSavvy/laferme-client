import { ContentLayout } from "@/components/layout";
import { getFreezoneItemsQueryOptions } from "@/services/freezone";

import { FreezoneTable } from "@/services/freezone/components/table/freezone-table";

import { QueryClient } from "@tanstack/react-query";

export const freezoneLoader = async (queryClient: QueryClient) => {
  const query = getFreezoneItemsQueryOptions();
  const freezoneItemsQuery =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  if (!freezoneItemsQuery.data)
    return console.log("No freezone items data found");

  return freezoneItemsQuery.data;
};

export const FreezoneRoute = () => {
  return (
    <ContentLayout title="თავისუფალი ზონა">
      <div className="mt-6">
        <FreezoneTable />
      </div>
    </ContentLayout>
  );
};
