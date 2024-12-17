import { ContentLayout } from "@/components/layout";
import { getOrdersQueryOptions, useOrdersStore } from "@/services/orders";
import { OrdersTable } from "@/services/orders/components";

import { QueryClient } from "@tanstack/react-query";

export const ordersLoader = async (queryClient: QueryClient) => {
  const query = getOrdersQueryOptions();
  const ordersQuery =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  if (!ordersQuery.data) return console.log("No orders data found");

  const setOrders = useOrdersStore.getState().setOrders;

  setOrders({
    orders: ordersQuery.data,
    message: ordersQuery.message!,
  });

  return ordersQuery.data;
};

export const OrdersRoute = () => {
  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <div className="mt-6">
        <OrdersTable />
      </div>
    </ContentLayout>
  );
};
