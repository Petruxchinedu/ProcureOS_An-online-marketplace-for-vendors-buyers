"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Users,
  FileText,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
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

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/stats");
      return res.data;
    },
    refetchInterval: 30000
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  const overview = stats?.overview || {};
  const rfqsByStatus = stats?.rfqsByStatus || {};

  const statCards = [
    {
      title: "Total Users",
      value: overview.totalUsers || 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active RFQs",
      value: overview.pendingRFQs || 0,
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Total Orders",
      value: overview.totalOrders || 0,
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-teal-500",
      change: "+23%",
      trend: "up"
    },
    {
      title: "Platform Revenue",
      value: `$${(overview.platformRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-amber-500 to-orange-500",
      change: "+15%",
      trend: "up"
    }
  ];

  const monthlyTrendData = {
    labels: (stats?.monthlyTrend || []).map((m: any) => `${m._id.month}/${m._id.year}`),
    datasets: [
      {
        label: "RFQs Created",
        data: (stats?.monthlyTrend || []).map((m: any) => m.count),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const statusBreakdown = {
    labels: Object.keys(rfqsByStatus),
    datasets: [
      {
        label: "RFQs by Status",
        data: Object.values(rfqsByStatus),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(251, 146, 60, 0.8)"
        ]
      }
    ]
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
          Executive Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-semibold">
          Real-time platform analytics and monitoring
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6 hover:border-slate-700 transition-all group"
          >
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
              stat.gradient
            )} />

            <div className="relative">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center",
                  stat.gradient
                )}>
                  <stat.icon size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold">
                  {stat.trend === "up" ? (
                    <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown size={12} className="sm:w-3.5 sm:h-3.5 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-xs sm:text-sm font-semibold mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
        {/* Monthly Trend */}
        <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6">
            Monthly Activity Trend
          </h3>
          <div className="h-64 sm:h-auto">
            <Line
              data={monthlyTrendData}
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

        {/* Status Breakdown */}
        <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6">
            RFQ Status Distribution
          </h3>
          <div className="h-64 sm:h-auto">
            <Bar
              data={statusBreakdown}
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

      {/* Recent Activity */}
      <div className="rounded-xl sm:rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-4 sm:p-6 mx-4 sm:mx-0">
        <h3 className="text-lg sm:text-xl font-black text-white mb-4 sm:mb-6">Recent Activity</h3>
        <div className="space-y-2 sm:space-y-3">
          {stats?.recentActivity?.slice(0, 5).map((rfq: any, index: number) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Activity size={16} className="sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm sm:text-base truncate">
                    {rfq.productId?.name || "Product"}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    {rfq.buyerId?.email} → {rfq.vendorId?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end sm:text-right gap-3">
                <p className={cn(
                  "text-xs font-black uppercase px-2 sm:px-3 py-1 rounded-full whitespace-nowrap",
                  rfq.status === "PENDING" && "bg-amber-500/10 text-amber-500",
                  rfq.status === "ACCEPTED" && "bg-emerald-500/10 text-emerald-500",
                  rfq.status === "REJECTED" && "bg-red-500/10 text-red-500"
                )}>
                  {rfq.status}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(rfq.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}