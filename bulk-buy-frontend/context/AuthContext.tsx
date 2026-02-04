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
    // Clear all token storage
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUser(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {!loading ? children : (
        <div className="h-screen w-screen flex items-center justify-center bg-[#020617]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-blue-500 font-black text-xs uppercase tracking-widest">Loading...</p>
          </div>
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