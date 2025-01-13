import { ContentLayout } from "@/components/layout";
import { CustomersTable } from "@/services/customers";

import { getCustomersQueryOptions } from "@/services/customers";
import { QueryClient } from "@tanstack/react-query";

export const customersLoader = async (queryClient: QueryClient) => {
  const query = getCustomersQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const CustomersRoute = () => {
  return (
    <ContentLayout title="სარეალიზაციო პუნქტი">
      <div className="mt-6">
        <CustomersTable />
      </div>
    </ContentLayout>
  );
};
