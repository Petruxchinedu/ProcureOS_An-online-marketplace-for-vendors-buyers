"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Inbox, ArrowUpRight, Clock, 
  Package, User, AlertCircle 
} from "lucide-react";
import Link from "next/link";

export default function VendorRFQListPage() {
  const { data: rfqs, isLoading, error, isError } = useQuery({
    queryKey: ["vendor-rfqs"],
    queryFn: async () => {
      // 1. Verify this endpoint exactly matches your backend route
      const res = await api.get("/rfq/vendor/my-rfqs"); 
      console.log("RFQ List Data:", res.data); // DEBUG LOG
      return res.data;
    }
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
       <p className="font-black text-blue-500 animate-pulse tracking-[0.5em] uppercase">Receiving Proposals...</p>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500 gap-4">
      <AlertCircle />
      <p className="font-black uppercase tracking-widest">Connection Error: Check API Terminal</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Incoming Traffic</span>
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter uppercase italic">Negotiation Inbox</h1>
        </div>

        {/* PROPOSAL LIST */}
        <div className="grid gap-4">
          {rfqs && rfqs.length > 0 ? (
            rfqs.map((rfq: any) => (
              <Link 
                key={rfq._id} 
                href={`/vendor/rfq/${rfq._id}`} 
                className="group bg-[#0F172A] border border-blue-900/20 p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div className="flex items-center gap-6">
                  {/* Handle Missing Product Images */}
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-blue-900/20 text-blue-400 group-hover:scale-110 transition-transform overflow-hidden">
                    {rfq.productId?.images?.[0] ? (
                        <img src={rfq.productId.images[0]} className="w-full h-full object-cover" alt="product" />
                    ) : (
                        <Package size={24} />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                         rfq.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                       }`}>
                         {rfq.status}
                       </span>
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">ID: {rfq._id.slice(-6)}</span>
                    </div>
                    {/* Fallback if productId isn't populated */}
                    <h3 className="text-xl font-black italic uppercase tracking-tight">
                        {rfq.productId?.name || "Unidentified Asset"}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User size={12} />
                        <span className="text-[10px] font-bold uppercase">{rfq.buyerId?.name || "Corporate Buyer"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase">{new Date(rfq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 mt-6 md:mt-0">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Proposed Value</p>
                    <p className="text-2xl font-[1000] text-emerald-400 italic">
                        ${((rfq.targetUnitPrice || 0) * (rfq.quantity || 0)).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{rfq.quantity} Units @ ${rfq.targetUnitPrice}/unit</p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowUpRight size={20} className="group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-32 text-center bg-[#0F172A] rounded-[3rem] border border-dashed border-blue-900/30">
              <Inbox size={48} className="mx-auto text-slate-800 mb-4" />
              <p className="text-slate-500 font-black text-xs uppercase tracking-widest">No Active Proposals Found</p>
              <p className="text-slate-700 text-[10px] mt-2">Terminal is live and listening for incoming RFQs...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}