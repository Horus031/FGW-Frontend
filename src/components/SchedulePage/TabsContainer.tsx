// ...existing code...
import { useState } from "react";
import { Button } from "../ui/button";
import ScheduleContainer from "./Schedule/ScheduleContainer";
import TaskContainer from "./Task/TaskContainer";
import ScheduleSelect from "./Schedule/ScheduleSelect";
import FilterButton from "../shared/Filter";
import type { AttendanceResponse } from "../../models/attendance";

type TabsContainerProps = {
  slotData: AttendanceResponse | null;
};

const TabsContainer = ({ slotData }: TabsContainerProps) => {
  const [tab, setTab] = useState("schedule");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="border border-gray-300 w-fit rounded-md text-black">
          <Button
            onClick={() => setTab("schedule")}
            className={`rounded-r-none cursor-pointer text-sm font-semibold ${tab === "schedule"
              ? "bg-primary text-white"
              : "bg-white text-[var(--color-gray-weak)]"
              }`}
          >
            Today's classes
          </Button>
          <Button
            onClick={() => setTab("task")}
            className={`rounded-l-none cursor-pointer text-sm font-semibold ${tab === "task"
              ? "bg-primary text-white"
              : "bg-white text-[var(--color-gray-weak)]"
              }`}
          >
            Your task
          </Button>
        </div>
        {/* ✅ Always render ScheduleSelect, just hide it */}
        <div className={tab === "schedule" ? "block" : "hidden"}>
          <ScheduleSelect />
        </div>
        <div className={tab === "task" ? "block" : "hidden"}>
          <FilterButton />
        </div>
      </div>

      <div>
        <div className={tab === "schedule" ? "block" : "hidden"}>
          <ScheduleContainer schedule={slotData?.schedule || []} />
        </div>
        <div className={tab === "task" ? "block" : "hidden"}>
          <TaskContainer />
        </div>
      </div>
    </div>
  );
};
export default TabsContainer;