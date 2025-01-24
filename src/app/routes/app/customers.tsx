import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DataTable, DebouncedInput } from "@/components/ui";
import { apiPaths } from "@/config";
import {
  AddCustomerForm,
  CustomerRowExpanded,
  getCustomersQueryOptions,
  useCustomerColumns,
  useCustomers,
} from "@/features/customer";
import { DownloadButton } from "@/features/excel";
import { useState } from "react";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getCustomersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const CustomersRoute = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: customersData } = useCustomers();
  const columns = useCustomerColumns();

  if (!customersData?.data) return null;

  const customers = customersData.data.data.flat();
  const fallback = customersData.data.message;

  return (
    <ContentLayout title="სარეალიზაციო პუნქტები">
      <div className="mb-6 flex justify-between gap-2">
        <DownloadButton url={apiPaths.excel.customer} />
        <DebouncedInput
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="მოძებნე"
          className="w-96 mr-auto"
        />
        <AppDrawer
          title="სარეალიზაციო პუნქტები"
          label="დაამატე სარეალიზაციო პუნქტი"
          className="max-w-xl"
        >
          <AddCustomerForm />
        </AppDrawer>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <CustomerRowExpanded row={row} />}
        getRowCanExpand={() => true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default CustomersRoute;
