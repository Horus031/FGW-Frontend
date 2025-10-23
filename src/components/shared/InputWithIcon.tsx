import type { Ref } from "react";
import MagnifyClass from "../icons/MagnifyClass";
import { Input } from "../ui/input";

type InputWithIconProps = {
  placeholder?: string;
  ref?: Ref<HTMLInputElement> | undefined;
};

const InputWithIcon = (props: InputWithIconProps) => {
  const { placeholder, ref } = props;
  return (
    <div className="relative">
      <MagnifyClass className="absolute top-1/2 left-4 -translate-y-1/2" />
      <Input ref={ref} className="w-xs pl-12" placeholder={placeholder} />
    </div>
  );
};

export default InputWithIcon;
