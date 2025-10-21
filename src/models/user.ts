export type UserInfo = {
  id?: string;
  email?: string;
  role?: Role;
  surname?: string;
  givenName?: string;
  avatar?: string | null;
  staffRole?: string;
};

type Role = {
  id: string;
  name: string;
}



export type UserAuth = {
  accessToken: string;
  refreshToken: string;
}
