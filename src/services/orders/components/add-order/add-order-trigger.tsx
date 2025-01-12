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

      <DrawerContent className="ml-auto max-w-2xl h-full">
        <DrawerHeader>
          <DrawerTitle>ახალი შეკვეთა</DrawerTitle>
          <DrawerDescription>Some description goes here.</DrawerDescription>
        </DrawerHeader>

        {/* Add order Form */}

        <AddOrderForm setIsOpen={setIsOpen} />
      </DrawerContent>
    </Drawer>
  );
};
