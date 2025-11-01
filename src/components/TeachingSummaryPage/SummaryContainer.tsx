import { useState } from "react";
import type { MajorState } from "../../models/major";
import MajorSelectCard from "../shared/MajorSelectCard";
import SummaryTableContainer from "./SummaryTableContainer";

const defaultMajor: MajorState = {
  programme: { index: 0, id: 1 },
  year: { index: 0, academicYear: "" },
  term: { index: 0, id: 0 },
  semester: { index: 0, code: "" },
  major: { index: 0, id: 0 },
};

const SummaryContainer = () => {
  const [major, setMajor] = useState<MajorState>(defaultMajor);

  return (
    <div>
      <MajorSelectCard isSummary major={major} setMajor={setMajor} />

      <SummaryTableContainer />
    </div>
  );
};

export default SummaryContainer;
