import axios from "axios";

export const api = axios.create({
  // Use the Vercel URL in production, localhost in development
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Essential for sending cookies if you use them for sessions
  withCredentials: true, 
});

// REQUEST INTERCEPTOR: This attaches the Token to every call
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: This catches 401s (expired tokens) 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Optional: window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);