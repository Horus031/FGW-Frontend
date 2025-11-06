import type { ClassGroup } from "./class";
import type { CourseGroup } from "./course";
import type { Room } from "./room";

export type Session = {
  id: string;
  class: ClassGroup;
  classId: string;
  course: CourseGroup;
  courseId: string;
  dateOn: Date;
  roomId: string;
  room: Room;
  teacherId: string;
  status: string;
};
