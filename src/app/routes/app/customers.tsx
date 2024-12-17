import { ContentLayout } from "@/components/layout";
import {
  CustomersTable,
  getCustomersQueryOptions,
  useCustomerStore,
} from "@/services/customers";
import { QueryClient } from "@tanstack/react-query";

export const customersLoader = async (queryClient: QueryClient) => {
  const query = getCustomersQueryOptions();
  const customersQuery =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  const setCustomers = useCustomerStore.getState().setCustomers;

  if (!customersQuery.data) return console.log("No customers data found");

  setCustomers(customersQuery.data);

  return customersQuery.data;
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
