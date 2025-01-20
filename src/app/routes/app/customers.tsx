import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DataTable } from "@/components/ui";
import { DrawerProvider } from "@/context";
import {
  AddCustomerForm,
  CustomerRowExpanded,
  getCustomersQueryOptions,
  useCustomerColumns,
  useCustomers,
} from "@/features/customer";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getCustomersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const CustomersRoute = () => {
  const { data: customersData } = useCustomers();
  const columns = useCustomerColumns();

  if (!customersData?.data) return null;

  const customers = customersData.data.data.flat();
  const fallback = customersData.data.message;

  return (
    <ContentLayout title="სარეალიზაციო პუნქტები">
      <DrawerProvider>
        <div className="mb-6 flex justify-end">
          <AppDrawer
            title="სარეალიზაციო პუნქტები"
            label="დაამატე სარეალიზაციო პუნქტი"
            className="max-w-xl"
          >
            <AddCustomerForm />
          </AppDrawer>
        </div>
      </DrawerProvider>
      <DataTable
        data={customers}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <CustomerRowExpanded row={row} />}
        getRowCanExpand={() => true}
      />
    </ContentLayout>
  );
};

export default CustomersRoute;
