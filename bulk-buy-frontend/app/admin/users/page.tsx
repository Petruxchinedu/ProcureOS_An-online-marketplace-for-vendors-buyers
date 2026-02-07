"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Search,
  UserCheck,
  UserX,
  Mail,
  Building2,
  Calendar,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function UsersManagement() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">User Management</h1>
          <p className="text-sm sm:text-base text-slate-400 font-semibold">
            {pagination.total} total users registered
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Create Admin Button */}
          <Link
            href="/admin/users/create-admin"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            <span className="hidden sm:inline">Create Admin</span>
            <span className="sm:hidden">New Admin</span>
          </Link>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">All Roles</option>
            <option value="VENDOR">Vendors</option>
            <option value="BUYER">Buyers</option>
            <option value="ADMIN">Admins</option>
          </select>

          {/* Search */}
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder:text-slate-500 font-semibold focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Users Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile: Card View */}
          <div className="block md:hidden space-y-3 px-4">
            {users.map((user: any) => (
              <div
                key={user._id}
                className="rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 space-y-3"
              >
                {/* User Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm truncate">{user.email}</p>
                      {user.isEmailVerified && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Shield size={10} className="text-emerald-500" />
                          <span className="text-xs text-emerald-500 font-semibold">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {user.isActive !== false ? (
                      <button
                        onClick={() => updateStatusMutation.mutate({ userId: user._id, isActive: false })}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <UserX size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStatusMutation.mutate({ userId: user._id, isActive: true })}
                        className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500 font-bold uppercase mb-1">Role</p>
                    <span className={cn(
                      "inline-block px-2 py-1 rounded-full text-xs font-black uppercase",
                      user.role === "VENDOR" && "bg-blue-500/10 text-blue-500",
                      user.role === "BUYER" && "bg-purple-500/10 text-purple-500",
                      user.role === "ADMIN" && "bg-amber-500/10 text-amber-500"
                    )}>
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-500 font-bold uppercase mb-1">Status</p>
                    {user.isActive !== false ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-500 font-bold">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-red-500 font-bold">Suspended</span>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <p className="text-slate-500 font-bold uppercase mb-1">Organization</p>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Building2 size={12} />
                      <span className="font-semibold truncate">
                        {user.organizationId?.name || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <p className="text-slate-500 font-bold uppercase mb-1">Joined</p>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={12} />
                      <span className="font-semibold">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 overflow-hidden">
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
            <div className="px-4 sm:px-6 py-4 bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-400 font-semibold text-center sm:text-left">
                Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, pagination.total)} of {pagination.total} users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-3 sm:px-4 py-2 bg-slate-800 rounded-lg text-white font-bold text-sm">
                  {currentPage} / {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={currentPage === pagination.pages}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}