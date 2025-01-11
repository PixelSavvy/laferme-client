import { DataTable } from "@/components/ui";
import { useCalendarFilter } from "@/hooks";
import { useOrders } from "../../api";
import { AddOrderTrigger } from "../add-order";
import { useOrderColumns } from "./orders-table-cols";
import { OrdersTableExpanded } from "./orders-table-expanded";

export const OrdersTable = () => {
  const columns = useOrderColumns();

  const ordersQuery = useOrders({});

  const { showAll, filteredData, fallback, CalendarFilter } = useCalendarFilter(
    {
      query: ordersQuery.data
        ? { ...ordersQuery.data, message: ordersQuery.data.message ?? "" }
        : undefined,
    },
  );

  if (!ordersQuery?.data) return null;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">
        {CalendarFilter}
        <AddOrderTrigger />
      </div>
      <DataTable
        columns={columns}
        data={showAll ? ordersQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => <OrdersTableExpanded row={row} />}
        fallback={fallback}
        isOrdersRoute
      />
    </div>
  );
};
