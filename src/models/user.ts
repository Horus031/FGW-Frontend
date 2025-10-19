export type UserInfo = {
  email?: string;
  role?: string;
  campus?: Campus;
  gender?: string;
  avatar?: string | null;
  status?: string;
};

type Campus = {
  id: string;
  code: string;
  name: string;
}

export type UserAuth = {
  accessToken: string;
  refreshToken: string;
}
