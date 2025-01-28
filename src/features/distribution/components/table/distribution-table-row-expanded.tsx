import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DialogClose,
  Form,
  FormSection,
  SelectStatusField,
} from "@/components/ui";
import { Order, orderSchema } from "@/features/orders";

import { statusesObj } from "@/config";
import { useUpdateOrder } from "@/features/orders/services";
import { useStatus } from "@/hooks";
import { Dispatch, SetStateAction } from "react";
import { DistributionTableRowProducts } from "./distribution-table-row-products";

type DistributionItemRowExpandedProps = {
  row: Row<Order>;
  verifyOTP: boolean;
  onVerifyOTP: Dispatch<SetStateAction<boolean>>;
};

export const DistributionItemRowExpanded = ({
  row,
  // verifyOTP,
  onVerifyOTP,
}: DistributionItemRowExpandedProps) => {
  const distributionItem = row.original;

  const { currentStatus, filteredStatuses } = useStatus({
    data: statusesObj.distribution,
    status: distributionItem.status,
  });

  const { update, isUpdating } = useUpdateOrder({ row });

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: distributionItem,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleContinue = () => {
    onVerifyOTP(true);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>შეკვეთის მიტანა</CardTitle>
        <CardDescription>შეიყვანეთ მიტანილი წონა</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex h-full flex-col gap-4"
            onSubmit={(e) => void form.handleSubmit(update)(e)}
          >
            {/* Products */}
            <FormSection title="პროდუქტები">
              <DistributionTableRowProducts
                fields={fields}
                disabled={isUpdating}
              />
            </FormSection>
            {/* Status */}
            <FormSection
              title="შეკვეთის სტატუსი"
              className="flex-col items-start"
            >
              <SelectStatusField
                form={form}
                name="status"
                items={filteredStatuses}
                label="სტატუსი"
                className="w-full self-end"
                placeholder={currentStatus.label}
                disabled={isUpdating}
              />
            </FormSection>
          </form>
        </Form>
      </CardContent>
      {/* Form Actions */}
      <CardFooter className="space-x-2 float-end">
        <Button
          disabled={!form.formState.isDirty || isUpdating}
          onClick={handleContinue}
          type="submit"
        >
          გაგრძელება
        </Button>
        <DialogClose asChild>
          <Button variant={"outline"}>გაუქმება</Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
};
