export type UserInfo = {
  email?: string;
  role?: Role;
  campus?: Campus;
  gender?: string;
  avatar?: string | null;
  status?: string;
};

type Role = {
  id: string;
  name: string;
}

type Campus = {
  id: string;
  code: string;
  name: string;
}

export type UserAuth = {
  accessToken: string;
  refreshToken: string;
}
