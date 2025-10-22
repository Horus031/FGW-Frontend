export type UserInfo = {
  id?: string;
  email?: string;
  role?: Role;
  surname?: string;
  givenName?: string;
  avatar?: string | null;
  staffRole?: string;
  campus?: Campus;
  student?: Student;
};

interface Campus {
  id: string;
  name: string;
}

interface Student {
  id: string;
  studentCode: string;
}


type Role = {
  id: string;
  name: string;
}



export type UserAuth = {
  accessToken: string;
  refreshToken: string;
}
