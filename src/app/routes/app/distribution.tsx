import { ContentLayout } from "@/components/layout";
import { DistributionTable } from "@/services/distribution";

export const DistributionRoute = () => {
  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="mt-6">
        <DistributionTable />
      </div>
    </ContentLayout>
  );
};
