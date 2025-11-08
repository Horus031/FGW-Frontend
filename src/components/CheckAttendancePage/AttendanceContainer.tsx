import { useEffect, useState } from "react";
import type { TimeSlotData } from "../../constants/attendanceMock";
import { getTimeSlotForCourse, setTimeSlotStatus } from "../../constants/attendanceMock";
import CourseGroupList from "../shared/CourseGroupList";
import AttendanceTableContainer from "./AttendanceTableContainer";

// Student type used for attendance rows (kept in container so we can manage per-slot data)
type StudentAttendance = {
  no: number;
  avatar: string;
  studentName: string;
  studentId: string;
  status?: "Attend" | "Absent";
  note: string;
};

type Props = {
  selectedCourseId?: string;
};

const fallbackData: TimeSlotData = {
  className: "DESI1219.1",
  timeSlotGroup: [
    { slot: 1, startTime: "08:00", endTime: "09:30", status: "Completed" },
    { slot: 2, startTime: "08:00", endTime: "09:30", status: "Pending" },
    { slot: 3, startTime: "08:00", endTime: "09:30", status: "Pending" },
  ],
};

const AttendanceContainer = ({ selectedCourseId }: Props) => {
  const timeSlotData = selectedCourseId
    ? (getTimeSlotForCourse(selectedCourseId) ?? fallbackData)
    : fallbackData;

  // selected slot number (e.g. 1,2,3). If undefined, no slot selected.
  const [selectedSlot, setSelectedSlot] = useState<number | undefined>(undefined);

  // attendance data stored per slot number. This allows copying between slots.
  const [attendanceBySlot, setAttendanceBySlot] = useState<Record<number, StudentAttendance[]>>({});

  const defaultStudents: StudentAttendance[] = [
    {
      no: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      studentName: "Nguyễn Hoàng Duy",
      studentId: "GDS200658",
      note: "",
    },
    {
      no: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      studentName: "Nguyễn Thị Lê",
      studentId: "GDS200659",
      note: "",
    },
    {
      no: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      studentName: "Lương Xuân Thanh",
      studentId: "GDS200660",
      note: "",
    },
    {
      no: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      studentName: "Phạm Ngọc Quỳnh Anh",
      studentId: "GDS200661",
      note: "",
    },
    {
      no: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      studentName: "Hoàng Mạnh Khiêm",
      studentId: "GDS200662",
      note: "",
    },
  ];

  const getAttendanceForSlot = (slot?: number) => {
    if (!slot) return undefined;
    return attendanceBySlot[slot] ?? undefined;
  };

  const setAttendanceForSlot = (slot: number, rows: StudentAttendance[]) => {
    setAttendanceBySlot((prev) => ({ ...prev, [slot]: rows }));
  };

  // Quick mark: set all students in the current slot to Attend or Absent
  const quickMarkAll = (status: "Attend" | "Absent") => {
    if (!selectedSlot) return;
    const base = attendanceBySlot[selectedSlot] ?? defaultStudents;
    const updated = base.map((s) => ({ ...s, status }));
    setAttendanceForSlot(selectedSlot, updated);
  };

  // Copy statuses from previous slot (selectedSlot - 1) to current selectedSlot
  const copyFromPreviousSlot = () => {
    if (!selectedSlot || selectedSlot <= 1) return;
    const prev = attendanceBySlot[selectedSlot - 1];
    if (!prev) return;
    // Merge statuses from prev into current (matching by studentId), keep notes if exist
    const current = attendanceBySlot[selectedSlot] ?? defaultStudents;
    const updated = current.map((s) => {
      const match = prev.find((p) => p.studentId === s.studentId);
      return match ? { ...s, status: match.status } : s;
    });
    setAttendanceForSlot(selectedSlot, updated);
  };

  // Auto-select the first slot when the timeSlotData changes
  useEffect(() => {
    const first = timeSlotData?.timeSlotGroup?.[0]?.slot;
    // set asynchronously to avoid synchronous setState inside effect warning
    const t = setTimeout(() => setSelectedSlot((prev) => (prev === first ? prev : first)), 0);
    return () => clearTimeout(t);
  }, [timeSlotData]);

  // version to trigger re-render when time slot statuses are updated
  const [timeSlotVersion, setTimeSlotVersion] = useState(0);

  const handleSave = () => {
    if (!selectedCourseId || !selectedSlot) return;
    setTimeSlotStatus(selectedCourseId, selectedSlot, "Completed");
    // bump version to re-render and pick up updated status from mock
    setTimeSlotVersion((v) => v + 1);
  };

  return (
    <div className="flex gap-6">
      <CourseGroupList
        timeSlotData={timeSlotData}
        isAttendance
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />

      <AttendanceTableContainer
        selectedSlot={selectedSlot}
        attendanceData={getAttendanceForSlot(selectedSlot) ?? defaultStudents}
        setAttendanceData={(rows) => selectedSlot && setAttendanceForSlot(selectedSlot, rows)}
        quickMarkAll={quickMarkAll}
        copyFromPreviousSlot={copyFromPreviousSlot}
        onSave={handleSave}
        // include version so container updates when timeSlot statuses change
        timeSlotVersion={timeSlotVersion}
      />
    </div>
  );
};

export default AttendanceContainer;
