import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  AppDrawer,
  CalendarFilter,
  DataTable,
  DebouncedInput,
  Separator,
  useCalendarFilter,
} from "@/components/ui";
import { apiPaths } from "@/config";
import { DownloadButton } from "@/features/excel";
import {
  AddOrderForm,
  getOrdersQueryOptions,
  OrderRowExpanded,
  useOrders,
  useOrdersColumns,
} from "@/features/orders";
import { useState } from "react";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getOrdersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const OrdersRoute = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: ordersData } = useOrders();
  const columns = useOrdersColumns();

  const { filteredData, fallback, ...restCalendarProps } = useCalendarFilter({
    data: ordersData,
  });

  if (!ordersData?.data) return null;

  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">შეკვეთები</h1>
          <span className="text-neutral-600 text-sm">
            შეკვეთების ცხრილის აღწერა
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <DownloadButton url={apiPaths.excel.order} />
          <Separator orientation="vertical" className="h-8" />
          <AppDrawer
            title="შეკვეთები"
            label="დაამატე შეკვეთა"
            className="max-w-2xl"
          >
            <AddOrderForm />
          </AppDrawer>
        </div>

        <Separator className="col-span-full" />

        {/* Filters */}
        <div className="flex justify-between col-span-full">
          <CalendarFilter {...restCalendarProps} />
          <DebouncedInput
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="მოძებნე"
            className="w-64 "
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <OrderRowExpanded row={row} />}
        getRowCanExpand={() => true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default OrdersRoute;
