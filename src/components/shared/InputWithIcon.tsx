import type { Ref } from "react";
import MagnifyClass from "../icons/MagnifyClass";
import { Input } from "../ui/input";

type InputWithIconProps = {
  placeholder?: string;
  // controlled value
  value?: string;
  onChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement> | undefined;
};

const InputWithIcon = (props: InputWithIconProps) => {
  const { placeholder, ref, value, onChange } = props;
  return (
    <div className="relative">
      <MagnifyClass className="absolute top-1/2 left-4 -translate-y-1/2" />
      <Input
        ref={ref}
        className="w-xs pl-12"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default InputWithIcon;
