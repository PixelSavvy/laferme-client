import { ContentLayout } from "@/components/layout";

import { FreezoneTable } from "@/services/freezone/components/table/freezone-table";

export const FreezoneRoute = () => {
  return (
    <ContentLayout title="თავისუფალი ზონა">
      <div className="mt-6">
        <FreezoneTable />
      </div>
    </ContentLayout>
  );
};
