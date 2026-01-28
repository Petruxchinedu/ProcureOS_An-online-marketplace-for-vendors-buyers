"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Inbox, Calendar, ArrowRight, Loader2, Trash2, 
  FileText, Zap, CheckCircle2, LayoutDashboard, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function VendorRFQInbox() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("leads");
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Debug: Log vendor ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔐 FRONTEND AUTH CHECK");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Vendor ID:", payload.userId);
        console.log("Role:", payload.role);
        console.log("Email:", payload.email);
        console.log("Token Expiry:", new Date(payload.exp * 1000).toLocaleString());
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        
        setDebugInfo(payload);
      } catch (error) {
        console.error("❌ Failed to decode token:", error);
        toast.error("Authentication error - please login again");
      }
    } else {
      console.error("❌ NO TOKEN FOUND");
      toast.error("Please login to continue");
    }
  }, []);

  // Fetch RFQs
  const { data: rfqs, isLoading, error, isError } = useQuery({
    queryKey: ["vendor-rfqs"],
    queryFn: async () => {
      console.log("📡 Fetching vendor RFQs...");
      try {
        const res = await api.get("/rfq/vendor");
        console.log("✅ API Response Status:", res.status);
        console.log("✅ API Response Data:", res.data);
        
        if (!res.data) {
          console.warn("⚠️  Response has no data");
          return [];
        }
        
        if (!Array.isArray(res.data)) {
          console.warn("⚠️  Response is not an array:", typeof res.data);
          return [];
        }
        
        console.log(`✅ Received ${res.data.length} RFQs`);
        return res.data;
      } catch (err: any) {
        console.error("❌ API Error:", err.response?.data || err.message);
        throw err;
      }
    },
    retry: 1,
    staleTime: 30000 // Cache for 30 seconds
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/rfq/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-rfqs"] });
      toast.success("Lead deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="relative">
          <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
          <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse" />
        </div>
        <p className="mt-6 text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase">
          Syncing Neural Pipeline...
        </p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-8">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-white mb-2">Connection Error</h2>
        <p className="text-slate-400 mb-4 text-center max-w-md">
          {(error as any)?.response?.data?.message || "Failed to load RFQs"}
        </p>
        <button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["vendor-rfqs"] })}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  const safeRFQs = rfqs || [];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      {/* GLOBAL VENDOR NAV */}
      <div className="border-b border-blue-900/20 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-black italic tracking-tighter text-blue-500">
              PROCURE.<span className="text-white">OS</span>
            </h2>
            <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setActiveTab("leads")}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", 
                  activeTab === "leads" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-500 hover:text-white"
                )}
              >
                Lead Box
              </button>
              <Link 
                href="/vendor/inventory" 
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
              >
                Inventory
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-[8px] font-black text-slate-500 uppercase">System Status</p>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                Encrypted & Live
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">
                Global Feed
              </span>
            </div>
            <h1 className="text-7xl font-[1000] tracking-tighter uppercase italic leading-none">
              Terminal
            </h1>
            <p className="text-slate-500 font-bold text-sm mt-4 max-w-md italic border-l-2 border-blue-900/50 pl-4">
              Real-time procurement matching and contract negotiation hub.
            </p>
          </div>
          
          <div className="bg-[#0F172A] border border-blue-900/30 p-8 rounded-[2.5rem] min-w-[280px] shadow-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <LayoutDashboard size={12} className="text-blue-500" /> Pipeline Value
            </p>
            <p className="text-4xl font-[1000] text-emerald-500 tracking-tighter italic">
              ${safeRFQs.reduce((acc: number, r: any) => 
                acc + (r.quantity * (r.vendorCounterPrice || r.targetUnitPrice || 0)), 0
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* DEBUG PANEL (remove in production) */}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <p className="text-xs font-bold text-yellow-500 mb-2">🔍 DEBUG INFO</p>
            <p className="text-xs text-slate-400">Vendor ID: {debugInfo.userId}</p>
            <p className="text-xs text-slate-400">RFQs Loaded: {safeRFQs.length}</p>
          </div>
        )}

        {/* FEED */}
        <div className="grid gap-8">
          {safeRFQs.length === 0 ? (
            <div className="bg-[#0F172A]/50 border-2 border-dashed border-blue-900/20 rounded-[4rem] py-40 text-center">
              <div className="relative inline-block mb-8">
                <Inbox className="text-slate-800" size={80} />
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
              </div>
              <p className="text-slate-500 font-[1000] uppercase tracking-[0.4em] text-sm">
                Frequency Silent
              </p>
              <p className="text-slate-700 text-[10px] font-black uppercase mt-4">
                Waiting for buyer signals...
              </p>
            </div>
          ) : (
            safeRFQs.map((rfq: any) => {
              const isAccepted = rfq.status?.toUpperCase() === 'ACCEPTED';
              const dealValue = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice || 0);

              return (
                <div 
                  key={rfq._id} 
                  className={cn(
                    "group relative overflow-hidden bg-[#0F172A] border border-blue-900/20 rounded-[3rem] p-1 transition-all hover:border-blue-500/40",
                    isAccepted && "border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.05)]"
                  )}
                >
                  <div className="p-8 flex flex-wrap md:flex-nowrap gap-8 items-center relative z-10">
                    {/* Visual Indicator */}
                    <div className={cn(
                      "w-24 h-24 rounded-[2.5rem] flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:rotate-[10deg]",
                      isAccepted 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    )}>
                      {isAccepted ? <CheckCircle2 size={40} /> : <Zap size={40} className="fill-current" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full border shadow-sm",
                          isAccepted 
                            ? "bg-emerald-500 text-black border-emerald-400" 
                            : "bg-blue-600 text-white border-blue-500"
                        )}>
                          {rfq.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-black flex items-center gap-2">
                          <Calendar size={12} /> {new Date(rfq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-[1000] text-3xl text-white tracking-tighter mb-2 uppercase italic group-hover:text-blue-400 transition-colors">
                        {rfq.productId?.name || "Premium Asset"}
                      </h3>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        Client: <span className="text-slate-200">
                          {rfq.buyerId?.name || rfq.buyerId?.email || "Corporate"}
                        </span>
                      </p>
                    </div>

                    {/* Money */}
                    <div className="px-10 md:border-x border-blue-900/20 text-right">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">
                        Proposed Value
                      </p>
                      <p className="text-4xl font-[1000] text-white tracking-tighter italic">
                        ${dealValue.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.2em] mt-2">
                        {rfq.quantity.toLocaleString()} Units
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 min-w-[220px]">
                      {isAccepted ? (
                        <div className="flex gap-2">
                          <Link 
                            href={`/vendor/invoice/${rfq._id}`} 
                            className="flex-1 bg-white text-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl"
                          >
                            <FileText size={16} /> Invoice
                          </Link>
                          <button 
                            onClick={() => { 
                              if(confirm("Delete this RFQ?")) 
                                deleteMutation.mutate(rfq._id) 
                            }} 
                            className="p-5 bg-red-500/10 text-red-500 rounded-[1.5rem] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ) : (
                        <Link 
                          href={`/vendor/rfq/${rfq._id}`} 
                          className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all shadow-xl group/btn"
                        >
                          Enter Negotiation <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Visual Glow */}
                  <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-blue-500/[0.03] to-transparent pointer-events-none" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}