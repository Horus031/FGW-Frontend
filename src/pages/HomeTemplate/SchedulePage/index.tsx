import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { getAttendanceByStudentID } from "../../../api/requests/attendance.api";
import { useWeekStore } from "../../../store/week";
import { useUserStore } from "../../../store/user";
import type { AttendanceResponse } from "../../../models/attendance";

// ✅ Helper to format date as YYYY-MM-DD in local timezone
const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
    setSlotData(null);

    // ✅ Use local timezone formatting instead of toISOString()
    const startDate = formatLocalDate(selectedWeek.start);
    const endDate = formatLocalDate(selectedWeek.end);

    // console.log('📅 Fetching attendance:', { startDate, endDate });

    // ✅ Debounce only the API call, not the loading state
    const debouncedFetch = debounce(async () => {
      try {
        const data = await getAttendanceByStudentID(studentId, startDate, endDate);
        setSlotData(data);
      } catch (error) {
        console.error("❌ Failed to fetch attendance:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

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