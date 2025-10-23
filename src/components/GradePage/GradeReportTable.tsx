import type { ColumnConfig } from "../shared/Table";
import type { GradeReportRow } from "../../models/grade";
import Table from "../shared/Table";
import { Badge } from "../ui/badge";

const GRADE_REPORT_DATA: GradeReportRow[] = [
  {
    no: 1,
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    semester: "Spring 2025",
    group: "GCS230351",
    startDate: "2025-02-10",
    endDate: "2025-05-20",
    averageMark: 8.5,
    status: "Passed",
  },
  {
    no: 2,
    courseCode: "MA201",
    courseName: "Calculus I",
    semester: "Spring 2025",
    group: "GCS230351",
    startDate: "2025-02-10",
    endDate: "2025-05-20",
    averageMark: 7.2,
    status: "Passed",
  },
  {
    no: 3,
    courseCode: "EN101",
    courseName: "Academic English",
    semester: "Spring 2025",
    group: "GCS230351",
    startDate: "2025-02-10",
    endDate: "2025-05-20",
    averageMark: 6.8,
    status: "Passed",
  },
  {
    no: 4,
    courseCode: "CS102",
    courseName: "Data Structures",
    semester: "Fall 2025",
    group: "GCS230351",
    startDate: "2025-08-15",
    endDate: "2025-12-01",
    averageMark: 5.9,
    status: "Failed",
  },
  {
    no: 5,
    courseCode: "MA202",
    courseName: "Calculus II",
    semester: "Fall 2025",
    group: "GCS230351",
    startDate: "2025-08-15",
    endDate: "2025-12-01",
    averageMark: 0,
    status: "In Progress",
  },
];

const GradeReportTable = () => {
  const columns: ColumnConfig<GradeReportRow>[] = [
    { key: "no", title: "No.", width: "50px" },
    { key: "courseCode", title: "Subject Code", width: "120px" },
    { key: "courseName", title: "Subject Name", width: "310px" },
    { key: "semester", title: "Semester", width: "120px" },
    { key: "group", title: "Group", width: "160px" },
    { key: "startDate", title: "Start Date", width: "120px" },
    { key: "endDate", title: "End Date", width: "120px" },
    { key: "averageMark", title: "Average Mark", width: "120px" },
    {
      key: "status",
      title: "Status",
      width: "160px",
      render: (_, row) => (
        <Badge
          className={`${
            row.status === "Passed"
              ? "border-approve bg-approve/10 text-approve"
              : row.status === "Failed"
              ? "border-danger bg-danger/10 text-danger"
              : "border-amber-500 bg-amber-500/10 text-amber-500"
          } border-1`}
        >
          {row.status}
        </Badge>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={GRADE_REPORT_DATA}
      textSize="text-sm"
      padding="px-4 py-3"
      bordered
      centered
      grade
    />
  );
};

export default GradeReportTable;
