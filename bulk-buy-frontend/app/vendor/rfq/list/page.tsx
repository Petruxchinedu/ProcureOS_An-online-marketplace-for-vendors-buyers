"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Inbox, ArrowUpRight, Clock, 
  Package, User, AlertCircle, RefreshCcw
} from "lucide-react";
import Link from "next/link";

export default function VendorRFQListPage() {
  const { data: rfqs, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["vendor-rfqs"],
    queryFn: async () => {
      // ATTEMPT 1: The most likely endpoint
      // Change this to "/rfq/vendor/my-rfqs" if "/rfq/vendor" fails
      const res = await api.get("/rfq/vendor"); 
      
      console.log("TERMINAL DATA DETECTED:", res.data);
      
      // Ensure we return an array
      if (res.data && Array.isArray(res.data)) return res.data;
      if (res.data && res.data.rfqs) return res.data.rfqs; // Handle nested response
      return [];
    }
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
       <p className="font-black text-blue-500 tracking-[0.5em] uppercase text-[10px]">Scanning Frequencies...</p>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-red-500 p-6 text-center">
      <AlertCircle size={48} className="mb-4 opacity-50" />
      <h2 className="text-2xl font-black uppercase italic mb-2">Connection Lost</h2>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-xs mb-6">
        The terminal failed to handshake with the server. Verify your credentials and network.
      </p>
      <button onClick={() => refetch()} className="flex items-center gap-2 bg-red-500/10 px-6 py-3 rounded-full border border-red-500/20 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all">
        <RefreshCcw size={14} /> Re-Initialize
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12 border-b border-blue-900/20 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Active Leads</span>
            </div>
            <h1 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none">Inbox</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Status</p>
            <p className="text-emerald-500 font-black uppercase italic">Operational</p>
          </div>
        </div>

        {/* PROPOSAL LIST */}
        <div className="grid gap-6">
          {rfqs && rfqs.length > 0 ? (
            rfqs.map((rfq: any) => (
              <Link 
                key={rfq._id} 
                // CRITICAL: Point this to your [id] page folder
                href={`/vendor/rfq/${rfq._id}`} 
                className="group bg-[#0F172A] border border-blue-900/10 p-10 rounded-[3rem] flex flex-col md:flex-row md:items-center justify-between hover:border-blue-500/50 transition-all hover:bg-[#0F172A]/80 shadow-2xl shadow-transparent hover:shadow-blue-500/5"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-black/40 rounded-[2rem] flex items-center justify-center border border-white/5 text-blue-500 group-hover:scale-105 transition-transform overflow-hidden">
                    {rfq.productId?.images?.[0] ? (
                        <img src={rfq.productId.images[0]} className="w-full h-full object-cover" alt="" />
                    ) : (
                        <Package size={32} />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                       <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                         rfq.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                       }`}>
                         {rfq.status}
                       </span>
                       <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">ID: {rfq._id.slice(-8)}</span>
                    </div>
                    <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                        {rfq.productId?.name || "Standard Asset"}
                    </h3>
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <User size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{rfq.buyerId?.name || "Client"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{new Date(rfq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Contract Value</p>
                    <p className="text-4xl font-[1000] text-emerald-400 tracking-tighter italic">
                        ${((rfq.targetUnitPrice || 0) * (rfq.quantity || 0)).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      {rfq.quantity} Units <span className="mx-2 opacity-20">|</span> ${rfq.targetUnitPrice}/unit
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-40 text-center bg-[#0F172A]/50 rounded-[4rem] border-2 border-dashed border-blue-900/20">
              <Inbox size={64} className="mx-auto text-blue-900/30 mb-6" />
              <p className="text-slate-500 font-[1000] uppercase tracking-[0.4em] text-sm">No Signals Detected</p>
              <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest mt-4">Monitoring global procurement frequencies...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}