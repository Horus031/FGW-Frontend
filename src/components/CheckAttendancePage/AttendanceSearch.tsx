import KeyframeIcon from "../icons/KeyframeIcon";
import SaveIcon from "../icons/SaveIcon";
import InputWithIcon from "../shared/InputWithIcon";
import Select from "../shared/Select";
import { Button } from "../ui/button";

const AttendanceSearch = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <InputWithIcon placeholder="Search Student..." />
      </div>

      <div className="flex items-center gap-3">
        <Select/>

        <Button
          className="border-secondary text-secondary font-semibold bg-secondary/5 flex items-center gap-2 h-10 hover:bg-secondary/5 hover:text-secondary cursor-pointer"
          variant="outline"
        >
          <KeyframeIcon />
          <span>Copy from Slot 1</span>
        </Button>

        <Button className="bg-secondary font-semibold cursor-pointer">
            <SaveIcon/>
            <span>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default AttendanceSearch;
