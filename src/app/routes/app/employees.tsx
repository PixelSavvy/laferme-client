import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DataTable, Separator } from "@/components/ui";
import { useEmployees } from "@/features/employees/api/get-employees";
import { useEmployeesColumns } from "@/features/employees/components";

export const clientLoader = (queryClient: QueryClient) => async () => {
  // const query = getCustomersQueryOptions();
  // return (
  //   queryClient.getQueryData(query.queryKey) ??
  //   (await queryClient.fetchQuery(query))
  // );

  return queryClient;
};

const EmployeesRoute = () => {
  const columnes = useEmployeesColumns();

  const { data: employees } = useEmployees();

  if (!employees?.data) return null;

  return (
    <ContentLayout title="თანამშრომლები">
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page Title */}
        <div className="grid grid-cols-2 gap-6 mb-7">
          <div>
            <h1 className="text-2xl font-semibold mb-1">თანამშრომლები</h1>
            <span className="text-neutral-600 text-sm">
              თანამშრომლების ცხრილის აღწერა
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <AppDrawer
            title="სარეალიზაციო პუნქტები"
            label="დაამატე კლიენტი"
            className="max-w-xl"
          >
            <div></div>
          </AppDrawer>
        </div>

        <Separator className="col-span-full" />
      </div>

      {/* Data table */}
      <DataTable
        data={employees.data}
        columns={columnes}
        fallback={employees.message}
      />
    </ContentLayout>
  );
};

export default EmployeesRoute;
