import { useState } from "react";
import { Button } from "../ui/button";
import ScheduleContainer from "./Schedule/ScheduleContainer";
import TaskContainer from "./Task/TaskContainer";

const TabsContainer = () => {
  const [tab, setTab] = useState("schedule");
  return (
    <div className="flex flex-col">
      <div className="border border-gray-300 w-fit rounded-md text-black">
        <Button
          onClick={() => setTab("schedule")}
          className={`rounded-r-none cursor-pointer text-sm font-semibold ${
            tab === "schedule" ? "bg-primary text-white" : "bg-white  text-[var(--color-gray-weak)]"
          }`}
        >
          Today's classes
        </Button>
        <Button
          onClick={() => setTab("task")}
          className={`rounded-l-none cursor-pointer text-sm font-semibold ${
            tab === "task" ? "bg-primary text-white" : "bg-white text-[var(--color-gray-weak)]"
          }`}
        >
          Your task
        </Button>
      </div>

      <div> 
          {tab === "schedule" ? (
            <ScheduleContainer/>
          ) : (
            <TaskContainer/>
          )}
      </div>
    </div>
  );
};

export default TabsContainer;
