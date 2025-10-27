export interface UserInfo {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  campus: Campus;
  student: student; 
  course? : string; 
}
interface Campus {
  id: string;
  name: string;
}

type Role = {
  id: string;
  name: string;
}

interface student {
  faculty: string;
  yearOfStudy: number;
  startTerm: string;
  endTerm: string;
  studentCode: string;
}

export type UserAuth = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}
