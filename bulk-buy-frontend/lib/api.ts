import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Check LocalStorage first, then Cookies
  const token = localStorage.getItem("token") || 
                document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});