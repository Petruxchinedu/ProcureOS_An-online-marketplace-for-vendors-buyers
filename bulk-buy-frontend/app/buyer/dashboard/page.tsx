"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  FileText,
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  Loader2,
  Store,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BuyerDashboard() {
  // Fetch buyer RFQs
  const { data: rfqs, isLoading: rfqsLoading } = useQuery({
    queryKey: ["buyer-rfqs-dashboard"],
    queryFn: async () => {
      const res = await api.get("/rfq/buyer");
      return res.data;
    }
  });

  const isLoading = rfqsLoading;

  // Calculate stats
  const pendingRFQs = rfqs?.filter((r: any) => r.status === "PENDING").length || 0;
  const acceptedRFQs = rfqs?.filter((r: any) => r.status === "ACCEPTED").length || 0;
  const totalRFQs = rfqs?.length || 0;
  
  const totalSpent = rfqs
    ?.filter((r: any) => r.status === "ACCEPTED")
    .reduce((sum: number, r: any) => {
      const price = r.vendorCounterPrice || r.targetUnitPrice;
      return sum + (r.quantity * price);
    }, 0) || 0;

  const statCards = [
    {
      title: "Active RFQs",
      value: pendingRFQs,
      icon: Clock,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Accepted Quotes",
      value: acceptedRFQs,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Total Requests",
      value: totalRFQs,
      icon: FileText,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
          Buyer Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-semibold">
          Track your procurement activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center",
                stat.color
              )}>
                <stat.icon size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold mb-1">{stat.title}</p>
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent RFQs */}
      <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-black text-white">My Recent RFQs</h2>
          <Link
            href="/buyer/rfqs"
            className="text-purple-400 hover:text-purple-300 font-bold text-sm transition-colors"
          >
            View All →
          </Link>
        </div>

        {rfqs && rfqs.length > 0 ? (
          <div className="space-y-3">
            {rfqs.slice(0, 5).map((rfq: any) => (
              <div
                key={rfq._id}
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <Package size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm sm:text-base truncate">
                        {rfq.productId?.name || "Product"}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">
                        {rfq.quantity} units requested
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className={cn(
                      "px-2 sm:px-3 py-1 rounded-full text-xs font-black uppercase whitespace-nowrap",
                      rfq.status === "PENDING" && "bg-amber-500/10 text-amber-500",
                      rfq.status === "ACCEPTED" && "bg-emerald-500/10 text-emerald-500",
                      rfq.status === "REJECTED" && "bg-red-500/10 text-red-500",
                      rfq.status === "NEGOTIATING" && "bg-blue-500/10 text-blue-500"
                    )}>
                      {rfq.status}
                    </span>
                    <p className="text-xs text-slate-500 font-semibold">
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold mb-4">No RFQs yet</p>
            <Link
              href="/buyer/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
            >
              <Store size={18} />
              Browse Products
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          href="/buyer/products"
          className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all group"
        >
          <Store className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base sm:text-lg font-black text-white mb-1">Browse Marketplace</h3>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Discover new products
          </p>
        </Link>

        <Link
          href="/buyer/rfqs"
          className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group"
        >
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base sm:text-lg font-black text-white mb-1">My RFQs</h3>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            Track your requests
          </p>
        </Link>

        <Link
          href="/buyer/orders"
          className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
        >
          <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base sm:text-lg font-black text-white mb-1">Orders</h3>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold">
            View your purchases
          </p>
        </Link>
      </div>
    </div>
  );
}