import MagnifyClass from "../icons/MagnifyClass";
import DatePicker from "../shared/DatePicker";
import { Input } from "../ui/input";

const ActivitiesFilter = () => {
  return (
    <div className="w-fit flex items-center gap-2">
      <div className="relative">
        <MagnifyClass className="absolute  top-1/2 left-4 -translate-y-1/2"/>
        <Input
          className="w-xs pl-12"
          placeholder="Search Lecturer by Staff Code..."
        />
      </div>

      <DatePicker />
    </div>
  );
};

export default ActivitiesFilter;
