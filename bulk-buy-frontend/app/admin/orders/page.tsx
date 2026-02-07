"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  ShoppingCart,
  Package,
  User,
  DollarSign,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrdersManagement() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-orders", statusFilter, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: statusFilter,
        page: currentPage.toString(),
        limit: "15"
      });
      const res = await api.get(`/admin/orders?${params}`);
      return res.data;
    }
  });

  const orders = data?.orders || [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const platformRevenue = totalRevenue * 0.02;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        <div className="md:col-span-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Order Management</h1>
          <p className="text-sm sm:text-base text-slate-400 font-semibold">
            {pagination.total} total orders processed
          </p>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4 sm:p-6">
          <p className="text-xs text-emerald-400 font-black uppercase mb-1">Platform Revenue</p>
          <p className="text-2xl sm:text-3xl font-black text-white">${platformRevenue.toLocaleString()}</p>
          <p className="text-xs text-slate-400 font-semibold mt-1">From current page</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 px-4 sm:px-0">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CREATED">Created</option>
          <option value="FULFILLED">Fulfilled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile: Card View */}
          <div className="block md:hidden space-y-3 px-4">
            {orders.map((order: any) => (
              <div
                key={order._id}
                className="rounded-xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 space-y-3"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <ShoppingCart size={16} className="text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-sm text-white font-bold truncate">
                      {order._id.slice(-8)}
                    </span>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-black uppercase whitespace-nowrap",
                    order.status === "PENDING" && "bg-amber-500/10 text-amber-500",
                    order.status === "CREATED" && "bg-blue-500/10 text-blue-500",
                    order.status === "FULFILLED" && "bg-emerald-500/10 text-emerald-500",
                    order.status === "COMPLETED" && "bg-green-500/10 text-green-500",
                    order.status === "CANCELLED" && "bg-red-500/10 text-red-500"
                  )}>
                    {order.status}
                  </span>
                </div>

                {/* Product Info */}
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Product</p>
                  <p className="font-bold text-white text-sm">{order.productId?.name || "N/A"}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    {order.quantity} units @ ${order.unitPrice}
                  </p>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500 font-bold uppercase mb-1">Buyer</p>
                    <div className="flex items-center gap-1 text-slate-300">
                      <User size={12} className="text-purple-400 flex-shrink-0" />
                      <span className="font-semibold truncate">
                        {order.buyerId?.email || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-500 font-bold uppercase mb-1">Vendor</p>
                    <div className="flex items-center gap-1 text-slate-300">
                      <User size={12} className="text-blue-400 flex-shrink-0" />
                      <span className="font-semibold truncate">
                        {order.vendorId?.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount & Date */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-emerald-400" />
                      <span className="font-black text-white text-sm">
                        ${(order.totalAmount || 0).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-500 font-bold mt-0.5">
                      Platform: ${((order.totalAmount || 0) * 0.02).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar size={12} />
                    <span className="font-semibold text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
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
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {orders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={16} className="text-emerald-400" />
                          <span className="font-mono text-sm text-white font-bold">
                            {order._id.slice(-8)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-white">{order.productId?.name || "N/A"}</p>
                          <p className="text-xs text-slate-400 font-semibold">
                            {order.quantity} units @ ${order.unitPrice}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <User size={14} className="text-purple-400" />
                          <span className="font-semibold text-sm truncate max-w-[150px]">
                            {order.buyerId?.email || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <User size={14} className="text-blue-400" />
                          <span className="font-semibold text-sm truncate max-w-[150px]">
                            {order.vendorId?.email || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-emerald-400" />
                            <span className="font-black text-white">
                              ${(order.totalAmount || 0).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-500 font-bold mt-1">
                            Platform: ${((order.totalAmount || 0) * 0.02).toFixed(2)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-black uppercase",
                          order.status === "PENDING" && "bg-amber-500/10 text-amber-500",
                          order.status === "CREATED" && "bg-blue-500/10 text-blue-500",
                          order.status === "FULFILLED" && "bg-emerald-500/10 text-emerald-500",
                          order.status === "COMPLETED" && "bg-green-500/10 text-green-500",
                          order.status === "CANCELLED" && "bg-red-500/10 text-red-500"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar size={14} />
                          <span className="font-semibold text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
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
                Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, pagination.total)} of {pagination.total} orders
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