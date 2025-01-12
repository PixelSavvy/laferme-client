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
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>დაამატე</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-2xl">
        <DrawerHeader>
          <DrawerTitle>ახალი პროდუქტი</DrawerTitle>
          <DrawerDescription>Some description goes here.</DrawerDescription>
        </DrawerHeader>

        {/* Add product Form */}

        <AddProductForm setIsOpen={setIsOpen} />
      </DrawerContent>
    </Drawer>
  );
};
