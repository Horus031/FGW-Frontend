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

  // lifted date range state for summary mode
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      <MajorSelectCard
        isSummary
        major={major}
        setMajor={setMajor}
        // provide controls for SummaryPicker date range
        summaryFrom={fromDate}
        summaryTo={toDate}
        setSummaryFrom={setFromDate}
        setSummaryTo={setToDate}
      />

      <SummaryTableContainer major={major} fromDate={fromDate} toDate={toDate} />
    </div>
  );
};

export default SummaryContainer;
