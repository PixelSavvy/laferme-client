import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  AppDrawer,
  CalendarFilter,
  DataTable,
  DebouncedInput,
  useCalendarFilter,
} from "@/components/ui";
import { apiPaths } from "@/config";
import { DrawerProvider } from "@/context";
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
      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {/* Excel Download button */}
        <DownloadButton url={apiPaths.excel.order} />
        {/* Calendar Filter */}
        <CalendarFilter {...restCalendarProps} />

        {/* Global Filter */}
        <DebouncedInput
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="მოძებნე"
          className="flex-1"
        />

        {/* Add Order Form */}
        <DrawerProvider>
          <AppDrawer
            title="მიმდინარე შეკვეთები"
            label="დაამატე შეკვეთა"
            className="max-w-3xl"
          >
            <AddOrderForm />
          </AppDrawer>
        </DrawerProvider>
      </div>
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
