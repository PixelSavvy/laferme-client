import { DataTable } from "@/components/ui";
import { useCustomers } from "../../api";
import { useCustomerColumns } from "./customers-table-cols";
import { CustomersTableExpanded } from "./customers-table-expanded";

export const CustomersTable = () => {
  const columns = useCustomerColumns();

  const { data: customers } = useCustomers({});

  if (!customers?.data) return null;

  return (
    <DataTable
      columns={columns}
      data={customers.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <CustomersTableExpanded row={row} />}
      fallback={customers.message}
      isCustomersRoute
    />
  );
};
