import {
  Button,
  DialogClose,
  DialogFooter,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { remainderProductItems } from "@/config";
import { formatDate } from "@/utils";
import { Plus, Save } from "lucide-react";

export const AddRemainderForm = () => {
  return (
    <div className="text-sm flex flex-col gap-7">
      {/* Date and Time */}
      <div className="space-x-2 font-medium">
        <span>შეყვანის დრო:</span>
        <span>{formatDate(new Date())}</span>
        <span>
          {new Date().getHours()}:{new Date().getMinutes()}
        </span>
      </div>
      {/* Items */}
      <div className="flex justify-start items-center gap-2">
        <div className="space-y-2 flex-1">
          <Label className="pl-2">პროდუქტი</Label>
          <Input placeholder="ქათამი - თავფეხით" />
        </div>
        <div className="space-y-2 w-20">
          <Label className="pl-2">რაოდ.</Label>
          <Input placeholder="0" />
        </div>
        <div className="space-y-2 w-20">
          <Label className="pl-2">წონა</Label>
          <Input placeholder="0" />
        </div>
      </div>
      {/* Add Item */}
      <div className="space-y-2">
        {/* Select an item from the list */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="აირჩიე პროდუქტი" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {remainderProductItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Add button */}
        <Button size={"sm"} variant={"outline"}>
          <Plus />
          <span>დაამატე</span>
        </Button>
      </div>

      <DialogFooter className="items-center gap-2 mt-8">
        <Button>
          <Save />
          <span>შენახვა</span>
        </Button>
        <DialogClose>გაუქმება</DialogClose>
      </DialogFooter>
    </div>
  );
};
