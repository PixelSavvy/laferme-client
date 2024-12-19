"use client";

import { Badge, Form } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useUpdateOrderStatus } from "../../api/update-order-status";
import { UpdateOrderStatus, updateOrderStatusSchema } from "../../validations";

// Обновляем тип для variant
type BadgeVariant = "info" | "success" | "danger" | "warning";

type OrderStatusTriggerProps = {
  id: number;
  status: string;
};

type StatusKey = "PREPARING" | "PREPARED" | "CANCELLED" | "RETURNED";

export const OrderStatusTrigger = ({ id, status }: OrderStatusTriggerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<StatusKey>(status as StatusKey);

  const statuses: Record<
    StatusKey,
    { variant: BadgeVariant; label: string; value: StatusKey }
  > = {
    PREPARING: {
      variant: "info",
      label: "მზადდება",
      value: "PREPARING",
    },
    PREPARED: {
      variant: "success",
      label: "გამზადებული",
      value: "PREPARED",
    },
    CANCELLED: {
      variant: "danger",
      label: "გაუქმებული",
      value: "CANCELLED",
    },
    RETURNED: {
      variant: "warning",
      label: "მობრუნებული",
      value: "RETURNED",
    },
  };

  // Filter out the current status
  const statusArray = Object.values(statuses).filter(
    (status) => status.value !== value,
  );

  const {
    mutate: updateOrderStatus,
    isPending,
    isSuccess,
  } = useUpdateOrderStatus({});

  const form = useForm<UpdateOrderStatus>({
    resolver: zodResolver(updateOrderStatusSchema),
    defaultValues: { id: id, status: value },
  });

  const handleSubmit: SubmitHandler<UpdateOrderStatus> = (payload) => {
    updateOrderStatus(
      {
        id: payload.id,
        status: payload.status,
      },
      {
        onSuccess: (data) => {
          setOpen((prev) => !prev);
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const handleSelect = (val: string) => {
    setValue(val as StatusKey);
    form.setValue("status", val);
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Form {...form}>
      <form>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            asChild
            className="hover:bg-transparent focus-within:bg-transparent active:bg-transparent w-32"
            tabIndex={0}
          >
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className=" justify-between p-0"
              type="button"
              tabIndex={-1}
            >
              {value ? (
                <Badge variant={statuses[value].variant}>
                  {statuses[value].label}
                </Badge>
              ) : (
                <Badge />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 max-w-max relative">
            {/* Pending */}
            {isPending && !isSuccess && (
              <div className="flex flex-col justify-center items-center absolute size-full inset-0 cursor-not-allowed">
                <div className="size-full bg-background opacity-80 inset-0 absolute z-10 rounded-md" />
                <div className="z-50 flex gap-1 justify-start items-center">
                  <ClipLoader className="inline-flex" size={16} />
                  <span className="typo-label-sm font-medium">დაელოდეთ</span>
                </div>
              </div>
            )}
            <Command>
              <CommandInput
                placeholder="აირჩიე სტატუსი"
                disabled
                className="disabled:opacity-100 placeholder:text-neutral-800 pl-1"
              />
              <CommandList>
                <CommandGroup className="py-2">
                  {statusArray.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={handleSelect}
                      className={cn(
                        "data-[selected='true']:bg-transparent max-w-max cursor-pointer w-full",
                      )}
                      disabled={isPending}
                    >
                      <Badge
                        variant={statuses[status.value].variant}
                        className="justify-center w-full"
                      >
                        {status.label}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </form>
    </Form>
  );
};
