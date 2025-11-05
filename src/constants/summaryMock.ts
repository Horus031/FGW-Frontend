export type SummarySlot = {
  date: string; // yyyy-mm-dd
  slot: number;
  room: string;
  courseCode: string;
  courseName: string;
  classCode: string;
  sectionNo: number;
  group: string;
  attended: boolean; // whether the teacher marked attended
  programmeId?: number; // optional filter key
  termCode?: string;
};

// Small mock dataset across a date range for TeachingSummary
export const SUMMARY_SLOTS: SummarySlot[] = [
  { date: "2025-10-12", slot: 1, room: "F201", courseCode: "BUSI1323", courseName: "Leadership in Organizations", classCode: "BMS1103", sectionNo: 1, group: "AEG116_OJT4", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-13", slot: 1, room: "F201", courseCode: "BUSI1632", courseName: "Negotiations", classCode: "BMS1104", sectionNo: 1, group: "AEG117", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-14", slot: 1, room: "F201", courseCode: "DESI1219", courseName: "Design Thinking", classCode: "TDS1502", sectionNo: 1, group: "DES101", attended: false, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-15", slot: 1, room: "F201", courseCode: "COMP1682", courseName: "Computer Networks", classCode: "CPS1201", sectionNo: 1, group: "NET101", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-16", slot: 1, room: "F202", courseCode: "BUSI1323", courseName: "Leadership in Organizations", classCode: "BMS1103", sectionNo: 1, group: "AEG116_OJT4", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-17", slot: 1, room: "F202", courseCode: "BUSI1632", courseName: "Negotiations", classCode: "BMS1104", sectionNo: 1, group: "AEG117", attended: false, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-18", slot: 2, room: "F203", courseCode: "DESI1219", courseName: "Design Thinking", classCode: "TDS1502", sectionNo: 2, group: "DES101", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-19", slot: 3, room: "F201", courseCode: "BUSI1205", courseName: "Business Analytics", classCode: "BMS1205", sectionNo: 1, group: "BA101", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-20", slot: 1, room: "F201", courseCode: "BUSI1323", courseName: "Leadership in Organizations", classCode: "BMS1103", sectionNo: 1, group: "AEG116_OJT4", attended: true, programmeId: 1, termCode: "S1-2025" },
  { date: "2025-10-21", slot: 1, room: "F201", courseCode: "BUSI1632", courseName: "Negotiations", classCode: "BMS1104", sectionNo: 1, group: "AEG117", attended: true, programmeId: 1, termCode: "S1-2025" },
];
