import { useEffect, useState } from "react";
import TabsContainer from "../../../components/SchedulePage/TabsContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { getAttendanceByStudentID } from "../../../api/requests/attendance.api";
import type { UserInfo } from "../../../models/user";
import { useWeekStore } from "../../../store/week";
import type { AttendanceResponse } from "../../../models/attendance";


const SchedulePage = () => {
  const { selectedWeek } = useWeekStore();
  const [slotData, setSlotData] = useState<AttendanceResponse | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserInfo;
    const studentId = user?.student?.id;
    if (!studentId || !selectedWeek) return;

    const fetchData = async () => {
      try {
        // console.log('🔄 Fetching data for week:', selectedWeek);

        const startDate = selectedWeek.start.toISOString().split("T")[0];
        const endDate = selectedWeek.end.toISOString().split("T")[0];

        const data = await getAttendanceByStudentID(
          studentId,
          startDate,
          endDate
        );

        console.log('✅ Data fetched:', data);
        setSlotData(data);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchData();
  }, [selectedWeek]);

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Schedule" />
      <TabsContainer slotData={slotData} />
    </div>
  );
};

export default SchedulePage;
