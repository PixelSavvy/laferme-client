import { ContentLayout } from "@/components/layout";
import { OrdersTable } from "@/services/orders/components";

import { getOrdersQueryOptions } from "@/services/orders";
import { QueryClient } from "@tanstack/react-query";

export const ordersLoader = async (queryClient: QueryClient) => {
  const query = getOrdersQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
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
