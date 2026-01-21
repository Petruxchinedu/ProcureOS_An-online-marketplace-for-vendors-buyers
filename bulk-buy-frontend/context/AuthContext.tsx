"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getMe } from "@/lib/auth";

type User = {
  _id: string;
  email: string;
  role: "BUYER" | "VENDOR" | "ADMIN";
  organizationId: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: (tokenOverride?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async (tokenOverride?: string) => {
    try {
      // Pass the token directly if we just logged in
      const res = await getMe(tokenOverride);
      setUser(res.data.user ?? res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {!loading ? children : (
        <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};