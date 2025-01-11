import { DataTable } from "@/components/ui";
import { useCustomers } from "../../api";
import { AddCustomerTrigger } from "../add-customer";
import { useCustomerColumns } from "./customers-table-cols";
import { CustomersTableExpanded } from "./customers-table-expanded";

export const CustomersTable = () => {
  const columns = useCustomerColumns();

  const { data: customers } = useCustomers({});

  if (!customers?.data) return null;

  return (
    <div className="space-y-6 mt-10">
      <div className="flex gap-4 justify-end">
        <AddCustomerTrigger />
      </div>
      <DataTable
        columns={columns}
        data={customers.data}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => <CustomersTableExpanded row={row} />}
        fallback={customers.message}
        isCustomersRoute
      />
    </div>
  );
};
