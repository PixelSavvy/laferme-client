import { DataTable } from "@/components/ui";

import { useFreezoneItems } from "../../api/get-freezone-items";
import { useFreezoneColumns } from "./freezone-table-cols";
import { FreezoneTableExpanded } from "./freezone-table-expanded";

export const FreezoneTable = () => {
  const columns = useFreezoneColumns();

  const { data: freezoneItem } = useFreezoneItems({});

  if (!freezoneItem?.data) return null;

  console.log(freezoneItem.data);

  return (
    <DataTable
      columns={columns}
      data={freezoneItem.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <FreezoneTableExpanded row={row} />}
      fallback={freezoneItem.message}
    />
  );
};
