import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { Save } from "lucide-react";

type CleanzoneEditActionProps = {
  className?: string;
};

export const CleanzoneEditAction = ({
  className = "",
}: CleanzoneEditActionProps) => {
  const form = useFormContext();
  return (
    <div className={cn(className)}>
      <Button disabled={!form.formState.isDirty} type="submit">
        <Save />
        <span>შენახვა</span>
      </Button>
    </div>
  );
};
