import axios from "axios";
import {api} from "./api"; // Remove the { } brackets

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

const API_BASE_URL = "http://localhost:5000/api"; // your backend port

export const getMe = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.get("/auth/me", { headers });
};

