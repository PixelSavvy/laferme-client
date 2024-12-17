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

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ახალი სარეალიზაციო პუნქტი</DrawerTitle>
          <DrawerDescription className="opacity-0">
            Some description goes here.
          </DrawerDescription>
        </DrawerHeader>

        {/* Add product Form */}
        <section className="size-full">
          <AddCustomerForm setIsOpen={setIsOpen} />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
