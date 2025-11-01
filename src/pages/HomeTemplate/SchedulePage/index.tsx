import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { getAttendanceByStudentID } from "../../../api/requests/attendance.api";
import { useWeekStore } from "../../../store/week";
import { useUserStore } from "../../../store/user";
import type { AttendanceResponse } from "../../../models/attendance";

const SchedulePage = () => {
  const { selectedWeek } = useWeekStore();
  const { user } = useUserStore();
  const [slotData, setSlotData] = useState<AttendanceResponse | null>(null);

  useEffect(() => {
    const studentId = user?.student?.id;
    if (!studentId || !selectedWeek) return;

    const startDate = selectedWeek.start.toISOString().split("T")[0];
    const endDate = selectedWeek.end.toISOString().split("T")[0];

    const fetchAttendance = debounce(async () => {
      try {
        const data = await getAttendanceByStudentID(studentId, startDate, endDate);
        setSlotData(data);
      } catch (error) {
        console.error("❌ Failed to fetch attendance:", error);
      }
    }, 800);

    fetchAttendance();
    return () => fetchAttendance.cancel();
  }, [selectedWeek, user]);

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Schedule" />
      <TabsContainer slotData={slotData} />
    </div>
  );
};

export default SchedulePage;
