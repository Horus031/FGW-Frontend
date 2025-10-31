import { majorData } from "../../../constants/temp";
import MajorSelectCard from "../../shared/MajorSelectCard";

const AttendanceCourseSelect = () => {
  return (
    <div className="flex flex-col gap-4 w-fit">
      <MajorSelectCard noMajor data={majorData} />
    </div>
  );
};

export default AttendanceCourseSelect;
