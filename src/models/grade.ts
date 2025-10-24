export type GradeReportRow = {
  no: number;
  courseCode: string;
  courseName: string;
  semester: string;
  group: string;
  startDate: string;
  endDate: string;
  averageMark: number;
  status: "Passed" | "Failed" | "In Progress";
};