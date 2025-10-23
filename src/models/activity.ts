export type ActivitySlot = {
  classCode: string;
  courseCode: string;
  teacherCode: string;
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