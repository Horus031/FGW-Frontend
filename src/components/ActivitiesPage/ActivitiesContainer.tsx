import ActivitiesFilter from "./ActivitiesFilter";
import ActivitiesSelect from "./ActivitiesSelect";
import { useMemo, useState } from "react";
import type { ColumnConfig } from "../shared/Table";
import { TIME_SLOTS } from "../../constants/constants";
import Table from "../shared/Table";
import type { ActivitySlot, RoomActivity } from "../../models/activity";
import { FLOOR_2_ACTIVITIES, FLOOR_3_ACTIVITIES } from "../../constants/temp";

const ActivitiesContainer = () => {
  const [tab, setTab] = useState(2);

  // default to today so DatePicker shows today's date on first load
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const rawData = tab === 2 ? FLOOR_2_ACTIVITIES : FLOOR_3_ACTIVITIES;

  // Filter rooms by staff code and date. If both filters are empty, return rawData.
  const data = useMemo(() => {
    if (!selectedDate) return rawData;

    // Use local date parts to avoid timezone shifts from toISOString()
    const dateStr = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : null;

    const slotKeys: (keyof RoomActivity)[] = [
      "slot1",
      "slot2",
      "slot3",
      "slot4",
      "slot5",
      "slot6",
      "slot7",
      "slot8",
      "slot9",
    ];

    return rawData.filter((room) => {
      for (const key of slotKeys) {
        const slot = room[key] as ActivitySlot | null;
        if (!slot) continue;

        const matchesDate = dateStr ? slot.date === dateStr : true;

        if (matchesDate) return true;
      }
      return false;
    });
  }, [rawData, selectedDate]);

  const renderActivity = (activity: ActivitySlot) => {
    if (!activity) return <span className="text-gray-400">-</span>;
    return (
      <div className="flex flex-col gap-1  text-[11px] text-primary">
        <span className="font-semibold text-secondary">
          {activity.classCode}
        </span>
        <span className="font-bold text-xs">{activity.courseCode}</span>
        <span className="">{activity.teacherCode}</span>
      </div>
    );
  };

  const columns: ColumnConfig<RoomActivity>[] = [
    {
      key: "room",
      title: <span className="lg:text-xs xl:text-sm">Room</span>,
      width: "120px",
      render: (value, row) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-sm">{value as string}</span>
          <span className="text-xs text-gray-500">
            Capacity: {row.capacity}
          </span>
        </div>
      ),
    },
    ...TIME_SLOTS.map((slot, index) => ({
      key: `slot${index + 1}` as keyof RoomActivity, //
      title: (
        <div className="flex flex-col lg:text-xs xl:text-sm">
          <span className="font-medium">
            {`Slot ${index + 1} / MBA ${index + 1}`}
          </span>
          <span className="font-normal text-[#D2D6DB]">
            {slot.start} - {slot.end}
          </span>
        </div>
      ),
      width: "149px",
      render: (value: RoomActivity[keyof RoomActivity]) =>
        renderActivity(value as ActivitySlot),
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <ActivitiesSelect tab={tab} setTab={setTab} />
        <ActivitiesFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="w-full">
        <Table
          columns={columns}
          data={data}
          centered={true}
          textSize="text-sm"
          padding="px-4 py-3"
          bordered
          headHeight="52px"
          schedule
          activity
        />
      </div>
    </div>
  );
};

export default ActivitiesContainer;
