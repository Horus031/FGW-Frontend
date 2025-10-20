export type UserInfo = {
  id: string; // chưa có mã số sinh viên nên thêm id trước
  email?: string;
  role?: string;
  campus?: Campus;
  gender?: string;
  avatar?: string | null;
  status?: string;
  givenName: string;
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
