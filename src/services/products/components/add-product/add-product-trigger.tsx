import { useState } from "react";

import { Plus } from "lucide-react";

import { AddProductForm } from "./add-product-form";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui";

export const AddProductTrigger = () => {
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
          <DrawerTitle>ახალი პროდუქტი</DrawerTitle>
          <DrawerDescription className="opacity-0">
            Some description goes here.
          </DrawerDescription>
        </DrawerHeader>

        {/* Add product Form */}
        <section className="size-full">
          <AddProductForm setIsOpen={setIsOpen} />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
