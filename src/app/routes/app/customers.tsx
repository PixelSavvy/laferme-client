import { ContentLayout } from "@/components/layout";
import { CustomersTable } from "@/services/customers";

export const CustomersRoute = () => {
  return (
    <ContentLayout title="სარეალიზაციო პუნქტი">
      <div className="mt-6">
        <CustomersTable />
      </div>
    </ContentLayout>
  );
};
