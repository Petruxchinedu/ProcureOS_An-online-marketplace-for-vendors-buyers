import { api } from "./api";

export const registerUser = (data: {
  email: string;
  password: string;
  role: "BUYER" | "VENDOR";
  organizationName?: string;
}) => api.post("/auth/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const verifyEmail = (token: string) =>
  api.get(`/auth/verify-email?token=${token}`);

export const forgotPassword = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data: {
  token: string;
  password: string;
}) => api.post("/auth/reset-password", data);

export const getMe = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.get("/auth/me", { headers });
};

export const logout = () => {
  // Clear all token storage
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.href = "/login";
};