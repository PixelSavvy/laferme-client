import { ContentLayout } from "@/components/layout";

import { FreezoneTable } from "@/services/freezone/components/table/freezone-table";

import { getFreezoneItemsQueryOptions } from "@/services/freezone";
import { QueryClient } from "@tanstack/react-query";

export const freezoneLoader = async (queryClient: QueryClient) => {
  const query = getFreezoneItemsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
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
