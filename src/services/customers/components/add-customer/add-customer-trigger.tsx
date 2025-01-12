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
import { AddCustomerForm } from "./add-customer-form";

export const AddCustomerTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>დაამატე</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-2xl">
        <DrawerHeader>
          <DrawerTitle>ახალი სარეალიზაციო პუნქტი</DrawerTitle>
          <DrawerDescription>Some description goes here.</DrawerDescription>
        </DrawerHeader>

        {/* Add product Form */}

        <AddCustomerForm setIsOpen={setIsOpen} />
      </DrawerContent>
    </Drawer>
  );
};
