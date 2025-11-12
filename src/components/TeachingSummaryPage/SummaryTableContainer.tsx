import { SUMMARY_SLOTS } from "../../constants/summaryMock";
import type { MajorState } from "../../models/major";
import MainSummaryTable from "./MainSummaryTable";
import SubTableDetails from "./SubTableDetails";

type Props = {
  major: MajorState;
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
};

const formatDateDisplay = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
};

const SummaryTableContainer = ({ major, fromDate, toDate }: Props) => {
  // determine date range
  const start = fromDate ? new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) : undefined;
  const end = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()) : undefined;

  const filtered = SUMMARY_SLOTS.filter((s) => {
    if (major?.programme?.id && s.programmeId && Number(major.programme.id) !== Number(s.programmeId)) return false;
    if (major?.semester?.code && s.termCode && s.termCode !== major.semester.code) return false;
    const sd = new Date(s.date + "T00:00:00");
    if (start && sd < start) return false;
    if (end && sd > end) return false;
    return true;
  });

  // aggregate per course for sub table
  const agg = new Map<string, { courseName: string; classCode: string; plan: number; attended: number }>();
  filtered.forEach((s) => {
    const key = s.courseCode;
    const cur = agg.get(key) || { courseName: s.courseName, classCode: s.classCode, plan: 0, attended: 0 };
    cur.plan += 1;
    if (s.attended) cur.attended += 1;
    agg.set(key, cur);
  });

  const classData = Array.from(agg.entries()).map(([courseCode, v], idx) => ({
    no: idx + 1,
    classCode: courseCode,
    className: v.courseName,
    planAttend: v.plan,
    attended: v.attended,
  }));

  // main table rows
  const slotData = filtered.map((s) => ({
    startDate: formatDateDisplay(s.date),
    slot: s.slot,
    room: s.room,
    course: s.courseName,
    sectionNo: s.sectionNo,
    group: s.group,
    attend: s.attended ? ("Attended" as const) : ("Absent" as const),
  }));

  return (
    <div className="flex flex-col gap-4">
      <SubTableDetails classData={classData} />

      <MainSummaryTable slotData={slotData} />
    </div>
  );
};

export default SummaryTableContainer;
