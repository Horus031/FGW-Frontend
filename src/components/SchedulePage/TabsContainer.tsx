// ...existing code...
import { useState } from "react";
import { Button } from "../ui/button";
import ScheduleContainer from "./Schedule/ScheduleContainer";
import TaskContainer from "./Task/TaskContainer";

const TabsContainer = () => {
  const [tab, setTab] = useState("schedule");
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-gray-300 w-fit rounded-md text-black">
        <Button
          onClick={() => setTab("schedule")}
          className={`rounded-r-none cursor-pointer  ${
            tab === "schedule" ? "bg-primary text-white" : "bg-white text-black"
          }`}
        >
          Today's classes
        </Button>
        <Button
          onClick={() => setTab("task")}
          className={`rounded-l-none cursor-pointer  ${
            tab === "task" ? "bg-primary text-white" : "bg-white text-black"
          }`}
        >
          Your task
        </Button>
      </div>

      <div>
        <div className={tab === "schedule" ? "block" : "hidden"}>
          <ScheduleContainer />
        </div>
        <div className={tab === "task" ? "block" : "hidden"}>
          <TaskContainer />
        </div>
      </div>
    </div>
  );
};

export default TabsContainer;
// ...existing code...