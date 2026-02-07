"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Building2,
  Users,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrganizationsManagement() {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-organizations", typeFilter, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: typeFilter,
        page: currentPage.toString(),
        limit: "15"
      });
      const res = await api.get(`/admin/organizations?${params}`);
      return res.data;
    }
  });

  const organizations = data?.organizations || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Organization Management</h1>
          <p className="text-sm sm:text-base text-slate-400 font-semibold">
            {pagination.total} registered organizations
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">All Types</option>
            <option value="VENDOR">Vendors</option>
            <option value="BUYER">Buyers</option>
          </select>
        </div>
      </div>

      {/* Organizations Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {organizations.map((org: any) => (
              <div
                key={org._id}
                className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6 hover:border-slate-700 transition-all group"
              >
                {/* Org Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <span className={cn(
                    "px-2 sm:px-3 py-1 rounded-full text-xs font-black uppercase",
                    org.type === "VENDOR" && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
                    org.type === "BUYER" && "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                  )}>
                    {org.type}
                  </span>
                </div>

                {/* Org Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-black text-white text-base sm:text-lg mb-1 truncate">{org.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">ID: {org._id.slice(-8)}</p>
                  </div>

                  {/* Stats */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users size={14} className="sm:w-4 sm:h-4" />
                      <span className="font-bold">
                        {org.userCount || 0} {org.userCount === 1 ? 'user' : 'users'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span className="font-semibold">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 px-4 sm:px-6 py-4 mx-4 sm:mx-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-400 font-semibold text-center sm:text-left">
                Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, pagination.total)} of {pagination.total} organizations
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