import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  AppDrawer,
  DataTable,
  DebouncedInput,
  Separator,
} from "@/components/ui";
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
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">სარეალიზაციო პუნქტები</h1>
          <span className="text-neutral-600 text-sm">
            სარეალიზაციო პუნქტების ცხრილის აღწერა
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <DownloadButton url={apiPaths.excel.customer} />
          <Separator orientation="vertical" className="h-8" />
          <AppDrawer
            title="სარეალიზაციო პუნქტები"
            label="დაამატე კლიენტი"
            className="max-w-2xl"
          >
            <AddCustomerForm />
          </AppDrawer>
        </div>

        <Separator className="col-span-full" />

        {/* Filters */}
        <div className="flex justify-between col-span-full">
          <div />
          <DebouncedInput
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="მოძებნე"
            className="w-64 "
          />
        </div>
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
