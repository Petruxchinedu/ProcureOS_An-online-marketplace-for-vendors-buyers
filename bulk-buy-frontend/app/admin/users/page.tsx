"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Mail,
  Building2,
  Calendar,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function UsersManagement() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", roleFilter, search, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        role: roleFilter,
        search,
        page: currentPage.toString(),
        limit: "15"
      });
      const res = await api.get(`/admin/users?${params}`);
      return res.data;
    }
  });

  // Update user status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const res = await api.patch(`/admin/users/${userId}/status`, { isActive });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user status");
    }
  });

  const users = data?.users || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">User Management</h1>
          <p className="text-slate-400 font-semibold">
            {pagination.total} total users registered
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-semibold focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">All Roles</option>
            <option value="VENDOR">Vendors</option>
            <option value="BUYER">Buyers</option>
            <option value="ADMIN">Admins</option>
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-blue-500 transition-colors w-64"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.map((user: any) => (
                  <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-black text-sm">
                            {user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-white">{user.email}</p>
                          {user.isEmailVerified && (
                            <div className="flex items-center gap-1 mt-1">
                              <Shield size={12} className="text-emerald-500" />
                              <span className="text-xs text-emerald-500 font-semibold">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-black uppercase",
                        user.role === "VENDOR" && "bg-blue-500/10 text-blue-500",
                        user.role === "BUYER" && "bg-purple-500/10 text-purple-500",
                        user.role === "ADMIN" && "bg-amber-500/10 text-amber-500"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building2 size={16} />
                        <span className="font-semibold text-sm">
                          {user.organizationId?.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={16} />
                        <span className="font-semibold text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive !== false ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-emerald-500 font-bold text-sm">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-red-500 font-bold text-sm">Suspended</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.isActive !== false ? (
                          <button
                            onClick={() => updateStatusMutation.mutate({ userId: user._id, isActive: false })}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Suspend User"
                          >
                            <UserX size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateStatusMutation.mutate({ userId: user._id, isActive: true })}
                            className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                            title="Activate User"
                          >
                            <UserCheck size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-800/30 flex items-center justify-between">
            <p className="text-sm text-slate-400 font-semibold">
              Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, pagination.total)} of {pagination.total} users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-slate-800 rounded-lg text-white font-bold">
                {currentPage} / {pagination.pages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                disabled={currentPage === pagination.pages}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}