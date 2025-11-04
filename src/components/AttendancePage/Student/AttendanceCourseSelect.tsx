import { useState } from "react";
import type { MajorState } from "../../../models/major";
import MajorSelectCard from "../../shared/MajorSelectCard";

const defaultMajor: MajorState = {
  programme: { index: 0, id: 1 },
  year: { index: 0, academicYear: "" },
  term: { index: 0, id: 0 },
  semester: { index: 0, code: "" },
  major: { index: 0, id: 0 },
};

const AttendanceCourseSelect = () => {
  const [major, setMajor] = useState<MajorState>(defaultMajor);
  return (
    <div className="flex flex-col gap-4 w-fit">
      <MajorSelectCard noMajor major={major} setMajor={setMajor} />
    </div>
  );
};

export default AttendanceCourseSelect;
