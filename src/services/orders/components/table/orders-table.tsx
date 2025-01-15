import { CalendarFilter, DataTable, UseCalendarFilter } from "@/components/ui";
import { apiPaths, statuses } from "@/config";
import { DownloadButton } from "@/services/excel";
import { useOrders } from "../../api";
import { AddOrderTrigger } from "../add-order";
import { useOrderColumns } from "./orders-table-cols";
import { OrdersTableExpanded } from "./orders-table-expanded";

export const OrdersTable = () => {
  const columns = useOrderColumns();

  const ordersQuery = useOrders({});

  const { showAll, filteredData, fallback, ...rest } = UseCalendarFilter({
    response: ordersQuery,
  });

  if (!ordersQuery?.data) return null;

  const notDeliveredOrders = ordersQuery.data.data.filter((order) => {
    return (
      order.status !== statuses.all.CANCELLED &&
      order.status !== statuses.all.RETURNED &&
      order.status !== statuses.all.DELIVERED
    );
  });

  const defaultFallback =
    notDeliveredOrders.length === 0 ? "შეკვეთები ვერ მოიძებნა" : fallback;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">
        <CalendarFilter {...rest} />

        <div className="flex gap-2">
          <AddOrderTrigger />
          <DownloadButton url={apiPaths.excel.getOrders} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={showAll ? ordersQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => <OrdersTableExpanded row={row} />}
        fallback={defaultFallback}
        isOrdersRoute
      />
    </div>
  );
};
