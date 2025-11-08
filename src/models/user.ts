export interface UserInfo {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  campus: Campus;
  student?: Student;
  course?: string;
  staff?: Staff;
}

export type Staff = {
  id?: string;
  userId: string;
  staffCode?: string;
  role?: Role;
  faculty?: string;
  status?: string;
  hireDate?: string;
  endDate?: string;
};
interface Campus {
  id: string;
  name: string;
}

type Role = {
  id: string;
  name: string;
};

export type Student = {
  id: string;
  userId: string;
  studentCode: string;
  enrolmentDay: string;
  mentorId: string;
  faculty: string;
  status: string;
  currentYear: string;
  startTerm: string;
  endTerm: string;
  startYear?: string;
};

export type UserAuth = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
};
