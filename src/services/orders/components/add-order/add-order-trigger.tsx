import { useState } from "react";

import { Plus } from "lucide-react";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui";
import { AddOrderForm } from "./add-order-form";

export const AddOrderTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      direction="right"
      open={isOpen}
      onOpenChange={setIsOpen}
      defaultOpen
    >
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>დაამატე</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ახალი შეკვეთა</DrawerTitle>
          <DrawerDescription className="opacity-0">
            Some description goes here.
          </DrawerDescription>
        </DrawerHeader>

        {/* Add order Form */}
        <section className="w-[48rem] h-full">
          <AddOrderForm setIsOpen={setIsOpen} />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
