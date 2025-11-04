export type ActivitySlot = {
  classCode: string;
  courseCode: string;
  // staff code of the lecturer (searchable by ActivitiesFilter)
  teacherCode: string;
  // optional ISO date string for the slot (e.g. "2025-10-16")
  // This allows filtering by date in ActivitiesFilter.
  date?: string;
} | null;

export type RoomActivity = {
  room: string;
  capacity: number;
  slot1: ActivitySlot;
  slot2: ActivitySlot;
  slot3: ActivitySlot;
  slot4: ActivitySlot;
  slot5: ActivitySlot;
  slot6: ActivitySlot;
  slot7: ActivitySlot;
  slot8: ActivitySlot;
  slot9: ActivitySlot;
};