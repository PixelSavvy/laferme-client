import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Input } from "./input";

type DebouncedInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  debounce?: number;
} & InputHTMLAttributes<HTMLInputElement>;

// DebouncedInput Component
export const DebouncedInput = ({
  value,
  onChange,
  debounce = 250,
  ...props
}: DebouncedInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        onChange({
          target: { value: inputValue },
        } as ChangeEvent<HTMLInputElement>),
      debounce
    );
    return () => clearTimeout(timeout);
  }, [inputValue, debounce]);

  return (
    <Input
      {...props}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      showLeftIcon
      leftIcon={<Search size={16} />}
    />
  );
};
