import { useEffect, useState } from "react";
import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { getAttendanceByStudentID } from "../../../api/requests/attendance.api";
import { useWeekStore } from "../../../store/week";
import debounce from "lodash.debounce";
import type { AttendanceResponse } from "../../../models/attendance";
import LoadingPage from "../../../components/shared/LoadingPage";
import { useUserStore } from "../../../store/user";

const SchedulePage = () => {
  const { selectedWeek } = useWeekStore();
  const { user } = useUserStore(); // ✅ moved here
  const [slotData, setSlotData] = useState<AttendanceResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const studentId = user?.student?.id;
    if (!studentId || !selectedWeek) return;

    const startDate = selectedWeek.start.toISOString().split("T")[0];
    const endDate = selectedWeek.end.toISOString().split("T")[0];

    const handler = debounce(async () => {
      try {
        setLoading(true);
        const data = await getAttendanceByStudentID(studentId, startDate, endDate);
        setSlotData(data);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      } finally {
        setLoading(false);
      }
    }, 800);

    handler();
    return () => handler.cancel();
  }, [selectedWeek, user]); // ✅ include `user` as dependency

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Schedule" />
      <TabsContainer slotData={slotData} />
    </div>
  );
};

export default SchedulePage;
