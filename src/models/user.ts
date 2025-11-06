export interface UserInfo {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  campus: Campus;
  student?: student;
  course?: string;
  staff?: staff;
}

interface staff {
  id?: string;
  staffCode?: string;
  role?: Role;
  faculty?: string;
}
interface Campus {
  id: string;
  name: string;
}

type Role = {
  id: string;
  name: string;
};

interface student {
  id: string;
  faculty: string;
  yearOfStudy: number;
  startTerm: string;
  endTerm: string;
  studentCode: string;
  currentYear: number;
}

export type UserAuth = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
};
