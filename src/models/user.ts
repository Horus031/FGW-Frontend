export type UserInfo = {
  fullName: string;
  avatar: string;
  studentId: string;
  email: string;
  major: string;
  year: string;
  academicYear: string;
  campus: string;
  courses: string[];
  accessToken?: string;
  refreshToken?: string;
};

export type User = Pick<UserInfo, "accessToken" | "refreshToken">;