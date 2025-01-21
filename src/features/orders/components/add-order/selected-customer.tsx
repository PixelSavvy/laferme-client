import { Customer } from "@/features/customer";
import { cn } from "@/lib";
import { useFormContext } from "react-hook-form";

type SelectedCustomerProps = {
  className?: string;
};

export const SelectedCustomer = ({ className = "" }: SelectedCustomerProps) => {
  const form = useFormContext();
  const customer = form.getValues("customer") as Customer;

  return (
    <div
      className={cn(
        "bg-neutral-50 rounded-md p-4 w-full text-sm space-y-2",
        className,
      )}
    >
      <div className="space-x-2">
        <span className="font-medium">სარეალიზაციო პუნქტი:</span>
        <span>{customer.name}</span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">საფასო იდნექსი:</span>
        <span>{customer.priceIndex}</span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">გადახდის მეთოდი:</span>
        <span>{customer.paymentMethod}</span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">საკონტაქტო პირი:</span>
        <span>{customer.contactPerson.name}</span>
      </div>
      <div className="space-x-2">
        <span className="font-medium">საკონტაქტო პირის ნომერი:</span>
        <span>{customer.contactPerson.phone}</span>
      </div>
    </div>
  );
};
