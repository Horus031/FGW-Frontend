export type UserInfo = {
  id: string; // chưa có mã số sinh viên nên thêm id trước
  email?: string;
  role?: Role;
  campus?: Campus;
  gender?: string;
  avatar?: string | null;
  status?: string;
  givenName: string;
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
