import { ContentLayout } from "@/components/layout";
import { OrdersTable } from "@/services/orders/components";

export const OrdersRoute = () => {
  return (
    <ContentLayout title="მიმდინარე შეკვეთები">
      <div className="mt-6">
        <OrdersTable />
      </div>
    </ContentLayout>
  );
};
