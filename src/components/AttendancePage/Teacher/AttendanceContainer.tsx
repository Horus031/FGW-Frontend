import { useCallback, useState } from "react";
import ClassGroupCard from "../../shared/ClassGroupCard";
import CourseGroupList from "../../shared/CourseGroupList";
import MajorSelectCard from "../../shared/MajorSelectCard";
import type { ColumnConfig } from "../../shared/Table";
import Table from "../../shared/Table";
import { Info } from "lucide-react";
import {
  courseGroupData,
  majorData,
} from "../../../constants/temp";
import type { MajorState } from "../../../models/major";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "../../../api/requests/class.api";

type StudentAttendanceRow = {
  studentId: string;
  studentName: string;
  absentPercentage: number;
  info?: null;
};

const studentAttendanceData: StudentAttendanceRow[] = [
  {
    studentId: "GCS230351",
    studentName: "Vo Minh Nghia",
    absentPercentage: 5,
    info: null,
  },
  {
    studentId: "GCS230352",
    studentName: "Tran Thi B",
    absentPercentage: 12,
    info: null,
  },
  {
    studentId: "GCS230353",
    studentName: "Nguyen Van C",
    absentPercentage: 0,
    info: null,
  },
  {
    studentId: "GCS230354",
    studentName: "Le Thi D",
    absentPercentage: 28,
    info: null,
  },
  {
    studentId: "GCS230355",
    studentName: "Pham Van E",
    absentPercentage: 42,
    info: null,
  },
  {
    studentId: "GCS230356",
    studentName: "Hoang Thi F",
    absentPercentage: 8,
    info: null,
  },
  {
    studentId: "GCS230357",
    studentName: "Do Van G",
    absentPercentage: 16,
    info: null,
  },
  {
    studentId: "GCS230358",
    studentName: "Bui Thi H",
    absentPercentage: 3,
    info: null,
  },
];

const defaultMajor: MajorState = {
  programme: { index: 0, id: 1 },
  year: { index: 0, academicYear: "" },
  term: { index: 0, id: 0 },
  semester: { index: 0, code: "" },
  major: { index: 0, id: 0 },
};

const AttendanceContainer = () => {
  const handleInfo = useCallback((row: StudentAttendanceRow) => {
    // TODO: open modal/side-panel with details
    console.log("Info clicked for:", row.studentId, row.studentName);
  }, []);

  const [major, setMajor] = useState<MajorState>(defaultMajor);
  const { data } = useQuery({
    queryKey: ["class-group", major.programme.id, major.term.id, major.major.id],
    queryFn: () => getAllClasses(major.programme.id, major.term.id, major.major.id),
  })

  const columns: ColumnConfig<StudentAttendanceRow>[] = [
    { key: "studentId", title: "ID", width: "300px" },
    { key: "studentName", title: "Student Name", width: "300px" },
    {
      key: "absentPercentage",
      title: "Absent (%) so far",
      width: "300px",
      render: (value) => {
        const pct = value as number;
        const color =
          pct >= 30
            ? "text-red-600"
            : pct >= 10
            ? "text-yellow-600"
            : "text-green-600";
        return (
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded bg-gray-200 overflow-hidden">
              <div
                className={`h-full ${
                  pct >= 30
                    ? "bg-red-500"
                    : pct >= 10
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
              />
            </div>
            <span className={`text-sm font-semibold ${color}`}>{pct}%</span>
          </div>
        );
      },
    },
    {
      key: "info",
      title: "",
      width: "50px",
      render: (_v, row) => (
        <button
          type="button"
          aria-label="View details"
          onClick={() => handleInfo(row)}
          className="p-1 rounded hover:bg-black/5"
        >
          <Info size={20} className="text-black" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex items-center gap-8">
        <MajorSelectCard major={major} setMajor={setMajor} data={majorData} />

        <ClassGroupCard data={data} />
      </div>

      <div className="flex items-start gap-6">
        <CourseGroupList courseGroupData={courseGroupData} />

        <div className="flex flex-col">
          <span className="text-sm text-gray-800 py-2">Total 24 slot</span>
          <Table
            columns={columns}
            data={studentAttendanceData}
            bordered
            padding="px-4 py-3"
            textSize="text-sm"
            grade
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceContainer;
