import { ContentLayout } from "@/components/layout";
import { DistributionTable } from "@/services/distribution";

import { getDistributionItemsQueryOptions } from "@/services/distribution";
import { QueryClient } from "@tanstack/react-query";

export const distributionLoader = async (queryClient: QueryClient) => {
  const query = getDistributionItemsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const DistributionRoute = () => {
  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="mt-6">
        <DistributionTable />
      </div>
    </ContentLayout>
  );
};
