import ActivitiesFilter from "./ActivitiesFilter";
import ActivitiesSelect from "./ActivitiesSelect";
import { useState } from "react";
import type { ColumnConfig } from "../shared/Table";
import { TIME_SLOTS } from "../../constants/constants";
import Table from "../shared/Table";
import type { ActivitySlot, RoomActivity } from "../../models/activity";

const FLOOR_2_ACTIVITIES: RoomActivity[] = [
  {
    room: "F201",
    capacity: 30,
    slot1: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot2: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot3: null,
    slot4: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot5: null,
    slot6: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot7: null,
    slot8: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot9: null,
  },
  {
    room: "F202",
    capacity: 35,
    slot1: null,
    slot2: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot3: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot4: null,
    slot5: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot6: null,
    slot7: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot8: null,
    slot9: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
  },
  {
    room: "F203",
    capacity: 40,
    slot1: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot2: null,
    slot3: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot4: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot5: null,
    slot6: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot7: null,
    slot8: null,
    slot9: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
  },
];

const FLOOR_3_ACTIVITIES: RoomActivity[] = [
  {
    room: "F301",
    capacity: 30,
    slot1: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot2: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot3: null,
    slot4: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot5: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot6: null,
    slot7: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot8: null,
    slot9: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
  },
  {
    room: "F302",
    capacity: 35,
    slot1: null,
    slot2: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot3: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot4: null,
    slot5: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot6: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot7: null,
    slot8: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot9: null,
  },
  {
    room: "F303",
    capacity: 40,
    slot1: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot2: null,
    slot3: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot4: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot5: null,
    slot6: null,
    slot7: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot8: {
      classCode: "TDS1502.1",
      courseCode: "DESI1219.3",
      teacherCode: "SonND24",
    },
    slot9: null,
  },
];

const ActivitiesContainer = () => {
  const [tab, setTab] = useState(2);

  const data = tab === 2 ? FLOOR_2_ACTIVITIES : FLOOR_3_ACTIVITIES;

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
        <ActivitiesFilter />
      </div>

      <div className="">
        <Table
          columns={columns}
          data={data}
          centered={true}
          textSize="text-sm"
          padding="px-4 py-3"
          bordered
          height="52px"
          schedule
          activity
        />
      </div>
    </div>
  );
};

export default ActivitiesContainer;
