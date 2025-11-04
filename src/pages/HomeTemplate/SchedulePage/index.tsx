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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const studentId = user?.student?.id;
    if (!studentId || !selectedWeek) return;

    // ✅ Start loading as soon as week changes
    setLoading(true);
    setSlotData(null); // optional: clear old data

    const startDate = selectedWeek.start.toISOString().split("T")[0];
    const endDate = selectedWeek.end.toISOString().split("T")[0];

    // ✅ Debounce only the API call, not the loading state
    const debouncedFetch = debounce(async () => {
      try {
        const data = await getAttendanceByStudentID(studentId, startDate, endDate);
        setSlotData(data);
      } catch (error) {
        console.error("❌ Failed to fetch attendance:", error);
      } finally {
        setLoading(false); // ✅ hide skeleton only when data is ready
      }
    }, 400);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [selectedWeek, user]);

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Schedule" />
      <TabsContainer slotData={slotData} loading={loading} />
    </div>
  );
};

export default SchedulePage;
