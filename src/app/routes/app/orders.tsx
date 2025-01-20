import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DataTable } from "@/components/ui";
import { DrawerProvider } from "@/context";
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

  if (!ordersData?.data) return null;

  const customers = ordersData.data.data.flat();
  const fallback = ordersData.data.message;

  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <DrawerProvider>
        <div className="mb-6 flex justify-end">
          <AppDrawer
            title="მიმდინარე შეკვეთები"
            label="დაამატე შეკვეთა"
            className="max-w-3xl"
          >
            <AddOrderForm />
          </AppDrawer>
        </div>
      </DrawerProvider>
      <DataTable
        data={customers}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <OrderRowExpanded row={row} />}
        getRowCanExpand={() => true}
      />
    </ContentLayout>
  );
};

export default OrdersRoute;
