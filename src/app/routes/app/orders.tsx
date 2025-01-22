import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  AppDrawer,
  CalendarFilter,
  DataTable,
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

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getOrdersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const OrdersRoute = () => {
  const { data: ordersData } = useOrders();
  const columns = useOrdersColumns();

  const { filteredData, fallback, ...restCalendarProps } = useCalendarFilter({
    data: ordersData,
  });

  if (!ordersData?.data) return null;

  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <div className="flex justify-between items-center mb-6 gap-2">
        <DownloadButton url={apiPaths.excel.order} />
        <CalendarFilter className="mr-auto" {...restCalendarProps} />
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
      />
    </ContentLayout>
  );
};

export default OrdersRoute;
