export interface UserInfo {
  id: string;
  email: string;
  role: Role;
  fullName: string;
  avatar: string | null;
  campus: Campus;
  academicYear?: string;
  yearOfStudy?: number;
  faculty?: string;
}
interface Campus {
  id: string;
  name: string;
}

type Role = {
  id: string;
  name: string;
}


export type UserAuth = {
  accessToken: string;
  refreshToken: string;
}
