import jwtDecode from "jwt-decode";

export interface DecodedToken {
  userId: string;
  role: "BUYER" | "VENDOR" | "ADMIN";
  organizationId: string;
  exp: number;
}

export const useAuth = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};
