import { useEffect, useState } from "react";
import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { getAttendanceByStudentID } from "../../../api/requests/attendance.api";
import type { UserInfo } from "../../../models/user";
import { useWeekStore } from "../../../store/week";
import debounce from "lodash.debounce";
import type { AttendanceResponse } from "../../../models/attendance";
import LoadingPage from "../../../components/shared/LoadingPage"; // 👈 import your loading component

const SchedulePage = () => {
  const { selectedWeek } = useWeekStore();
  const [slotData, setSlotData] = useState<AttendanceResponse | null>(null);
  const [loading, setLoading] = useState(false); // 👈 add loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserInfo;
    const studentId = user?.student?.id;
    if (!studentId || !selectedWeek) return;

    const startDate = selectedWeek.start.toISOString().split("T")[0];
    const endDate = selectedWeek.end.toISOString().split("T")[0];

    const handler = debounce(async () => {
      try {
        setLoading(true); // 👈 start loading
        const data = await getAttendanceByStudentID(studentId, startDate, endDate);
        setSlotData(data);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      } finally {
        setLoading(false); // 👈 stop loading
      }
    }, 800);

    handler();

    return () => handler.cancel();
  }, [selectedWeek]);

  // ✅ show loading spinner until data arrives
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
