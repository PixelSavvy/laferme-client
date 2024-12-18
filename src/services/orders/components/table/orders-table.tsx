import { DataTable } from "@/components/ui";
import { useOrders } from "../../api";
import { useOrderColumns } from "./orders-table-cols";
import { OrdersTableExpanded } from "./orders-table-expanded";

export const OrdersTable = () => {
  const columns = useOrderColumns();

  const { data: orders } = useOrders({});

  if (!orders?.data) return null;

  console.log(orders.data);

  return (
    <DataTable
      columns={columns}
      data={orders.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <OrdersTableExpanded row={row} />}
      fallback={orders.message}
      isOrdersRoute
    />
  );
};
