"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Award,
  Loader2,
  Calendar
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueAnalytics() {
  const { data: revenue, isLoading } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const res = await api.get("/admin/analytics/revenue");
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  const summary = revenue?.summary || {};
  const monthlyRevenue = revenue?.monthlyRevenue || [];
  const topVendors = revenue?.topVendors || [];

  const monthlyChartData = {
    labels: monthlyRevenue.map((m: any) => `${m.month}/${m.year}`),
    datasets: [
      {
        label: "Transaction Volume",
        data: monthlyRevenue.map((m: any) => m.volume),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y"
      },
      {
        label: "Platform Revenue",
        data: monthlyRevenue.map((m: any) => m.revenue),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y1"
      }
    ]
  };

  const topVendorsChart = {
    labels: topVendors.slice(0, 10).map((v: any) => v.vendorEmail?.split('@')[0] || "Unknown"),
    datasets: [
      {
        label: "Platform Revenue from Vendor",
        data: topVendors.slice(0, 10).map((v: any) => v.platformRevenue),
        backgroundColor: "rgba(168, 85, 247, 0.8)"
      }
    ]
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
          Revenue Analytics
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-semibold">
          Financial overview and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <DollarSign size={20} className="sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-black uppercase">Platform Revenue</p>
              <p className="text-xl sm:text-2xl font-black text-white">
                ${(summary.platformRevenue || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
            <TrendingUp size={12} />
            <span>2% of total volume</span>
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center">
              <TrendingUp size={20} className="sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-blue-400 font-black uppercase">Total Volume</p>
              <p className="text-xl sm:text-2xl font-black text-white">
                ${(summary.totalVolume || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-semibold">All transactions processed</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center">
              <ShoppingCart size={20} className="sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-purple-400 font-black uppercase">Total Orders</p>
              <p className="text-xl sm:text-2xl font-black text-white">{summary.totalOrders || 0}</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-semibold">Completed transactions</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Award size={20} className="sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-400 font-black uppercase">Avg Order Value</p>
              <p className="text-xl sm:text-2xl font-black text-white">
                ${(summary.averageOrderValue || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-semibold">Per transaction</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
        {/* Monthly Trend */}
        <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Calendar className="text-blue-400" size={20} />
            <span className="hidden sm:inline">Monthly Revenue Trend</span>
            <span className="sm:hidden">Monthly Trend</span>
          </h3>
          <div className="h-64 sm:h-auto">
            <Line
              data={monthlyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                  mode: "index",
                  intersect: false
                },
                plugins: {
                  legend: {
                    display: true,
                    labels: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  }
                },
                scales: {
                  y: {
                    type: "linear",
                    display: true,
                    position: "left",
                    grid: { color: "rgba(148, 163, 184, 0.1)" },
                    ticks: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  },
                  y1: {
                    type: "linear",
                    display: true,
                    position: "right",
                    grid: { drawOnChartArea: false },
                    ticks: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  },
                  x: {
                    grid: { color: "rgba(148, 163, 184, 0.1)" },
                    ticks: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Top Vendors */}
        <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Award className="text-purple-400" size={20} />
            <span className="hidden sm:inline">Top 10 Vendors by Revenue</span>
            <span className="sm:hidden">Top Vendors</span>
          </h3>
          <div className="h-64 sm:h-auto">
            <Bar
              data={topVendorsChart}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: "rgba(148, 163, 184, 0.1)" },
                    ticks: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { 
                      color: "rgba(148, 163, 184, 0.8)",
                      font: { size: 10 }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Vendors Table - Desktop Only */}
      <div className="hidden md:block rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 overflow-hidden mx-4 sm:mx-0">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-xl font-black text-white">Top Performing Vendors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase">Vendor</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase">Total Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase">Platform Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {topVendors.map((vendor: any, index: number) => (
                <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index < 3 && <Award className="text-amber-400" size={16} />}
                      <span className="font-black text-white">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white truncate max-w-[200px]">{vendor.vendorEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-black text-white">${vendor.totalRevenue.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-black text-emerald-400">${vendor.platformRevenue.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{vendor.orderCount}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Vendors - Mobile Cards */}
      <div className="block md:hidden space-y-3 px-4">
        <h3 className="text-lg font-black text-white mb-3">Top Vendors</h3>
        {topVendors.slice(0, 5).map((vendor: any, index: number) => (
          <div
            key={index}
            className="rounded-xl bg-slate-900/50 border border-slate-800 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {index < 3 && <Award className="text-amber-400" size={16} />}
                <span className="font-black text-white">#{index + 1}</span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">{vendor.orderCount} orders</p>
            </div>
            <p className="font-bold text-white text-sm mb-2 truncate">{vendor.vendorEmail}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-slate-500 font-bold uppercase mb-1">Total Revenue</p>
                <p className="font-black text-white">${vendor.totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-500 font-bold uppercase mb-1">Platform Revenue</p>
                <p className="font-black text-emerald-400">${vendor.platformRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}