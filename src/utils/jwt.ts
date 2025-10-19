import { jwtDecode } from "jwt-decode";
export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  exp: number; // thời gian hết hạn (Unix timestamp)
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
