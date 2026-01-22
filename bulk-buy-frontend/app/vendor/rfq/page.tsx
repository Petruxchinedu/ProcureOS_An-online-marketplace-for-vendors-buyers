"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Inbox, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  Trash2, 
  FileText, 
  Zap, 
  CheckCircle2, 
  ShieldAlert 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function VendorRFQInbox() {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: rfqs, isLoading, isError } = useQuery({
  queryKey: ["vendor-rfqs"],
  queryFn: async () => {
    // Try the "my-rfqs" suffix which is more specific to the vendor's own leads
    const res = await api.get("/rfq/vendor/my-rfqs"); 
    console.log("Terminal Data Received:", res.data); // Look at your browser console!
    return Array.isArray(res.data) ? res.data : [];
  },
  // Keep trying if it fails
  retry: 1 
});

  // 2. Delete Mutation (Only for accepted deals)
  const deleteMutation = useMutation({
    mutationFn: async (rfqId: string) => {
      return await api.delete(`/rfq/${rfqId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-rfqs"] });
      toast.success("Record cleared from ledger");
    },
    onError: () => {
      toast.error("Failed to purge record");
    }
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent link navigation
    if (confirm("Purge this finalized contract from your active view?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
      <p className="text-slate-500 font-black tracking-[0.3em] text-xs uppercase">Syncing Leads...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Live Pipeline</span>
            </div>
            <h1 className="text-5xl font-[1000] tracking-tighter uppercase italic">Lead Inbox</h1>
            <p className="text-slate-500 font-bold text-sm mt-2">Executive-grade monitoring of high-value procurement requests.</p>
          </div>
          <div className="bg-[#0F172A] border border-blue-900/30 px-6 py-3 rounded-2xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Pipeline Value</p>
            <p className="text-2xl font-black text-emerald-500">
              ${rfqs?.reduce((acc: number, r: any) => acc + (r.quantity * (r.targetUnitPrice || 0)), 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {!rfqs || rfqs.length === 0 ? (
            <div className="bg-[#0F172A] border-2 border-dashed border-blue-900/20 rounded-[3rem] p-32 text-center">
              <Inbox className="mx-auto text-slate-800 mb-6" size={64} />
              <p className="text-slate-500 font-black uppercase tracking-widest">No signals detected in the terminal.</p>
            </div>
          ) : (
            rfqs.map((rfq: any) => {
              const isAccepted = rfq.status?.toUpperCase() === 'ACCEPTED';
              const dealValue = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice || 0);

              return (
                <div 
                  key={rfq._id} 
                  className={cn(
                    "relative overflow-hidden bg-[#0F172A] border border-blue-900/20 rounded-[2.5rem] p-8 transition-all group hover:border-blue-500/40",
                    isAccepted && "border-emerald-500/20 bg-emerald-500/[0.01]"
                  )}
                >
                  <div className="flex flex-wrap md:flex-nowrap gap-8 items-center relative z-10">
                    
                    {/* Visual Indicator */}
                    <div className={cn(
                      "w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                      isAccepted ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    )}>
                      {isAccepted ? <CheckCircle2 size={32} /> : <Zap size={32} className="fill-current" />}
                    </div>

                    {/* Product & Buyer Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border",
                          isAccepted ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        )}>
                          {rfq.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                          <Calendar size={12} /> {new Date(rfq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-black text-2xl text-white leading-none tracking-tight mb-2 uppercase italic">{rfq.productId?.name}</h3>
                      <p className="text-sm text-slate-400 font-bold">
                        Buyer: <span className="text-slate-200">{rfq.buyerId?.organizationName || "Private Enterprise"}</span>
                      </p>
                    </div>

                    {/* Financial Projection */}
                    <div className="px-8 md:border-x border-blue-900/20 text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Contract Value</p>
                      <p className="text-3xl font-[1000] text-white tracking-tighter tabular-nums">
                        ${dealValue.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                        {rfq.quantity.toLocaleString()} Units
                      </p>
                    </div>

                    {/* Action Hub */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      {isAccepted ? (
                        <div className="flex gap-2">
                          <Link 
                            href={`/vendor/invoice/${rfq._id}`}
                            className="flex-1 bg-emerald-500 text-black py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                          >
                            <FileText size={16} /> Invoice
                          </Link>
                          {/* DELETE OPTION - ONLY FOR ACCEPTED DEALS */}
                          <button 
                            onClick={(e) => handleDelete(e, rfq._id)}
                            className="p-4 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                            title="Purge Record"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ) : (
                        <Link 
                          href={`/vendor/rfq/${rfq._id}`}
                          className="w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all group/btn"
                        >
                          Negotiation Terminal <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Aesthetic Background Pattern */}
                  <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/[0.02] to-transparent pointer-events-none" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}