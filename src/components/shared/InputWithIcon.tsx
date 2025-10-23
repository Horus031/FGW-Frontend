import MagnifyClass from "../icons/MagnifyClass";
import { Input } from "../ui/input";

type InputWithIconProps = {
    placeholder? : string;
};

const InputWithIcon = (props: InputWithIconProps) => {
    const { placeholder } = props
  return (
    <div className="relative">
      <MagnifyClass className="absolute  top-1/2 left-4 -translate-y-1/2" />
      <Input
        className="w-xs pl-12"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithIcon;
