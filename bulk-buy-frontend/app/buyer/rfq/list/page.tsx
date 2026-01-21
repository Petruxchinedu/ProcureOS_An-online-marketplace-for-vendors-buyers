"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { 
  Inbox, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  BarChart3,
  Zap,
  ShoppingBag,
  AlertTriangle,
  RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BuyerRFQDashboard() {
const { data: rfqs, isLoading, isError, error, refetch } = useQuery({
      queryKey: ["buyer-rfqs"],
    queryFn: async () => {
const res = await api.get("/rfq/list/buyer");
      return Array.isArray(res.data) ? res.data : [];
    },
    retry: 1,
  });

  const paymentMutation = useMutation({
    mutationFn: async (rfqId: string) => {
      const res = await api.post("/payments/create-checkout", { rfqId });
      return res.data; // This is the object containing the Stripe URL
    },
    onSuccess: (data) => {
      // Redirect the user to the Stripe Checkout page
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err: any) => {
      console.error("Payment Error:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  });

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
      <div className="w-12 h-12 border-[6px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-6 font-[900] text-slate-500 animate-pulse tracking-[0.4em] text-[10px] uppercase">Initializing_Secure_Link...</p>
    </div>
  );

 if (isError) return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] p-8">
    <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-[2.5rem] flex flex-col items-center max-w-lg text-center">
      <AlertTriangle className="text-red-500 mb-6" size={50} />
      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Connection Error</h2>
      <p className="text-slate-400 font-bold text-sm mt-4 leading-relaxed">
        {/* This will now show the actual error from your backend */}
        {(error as any)?.response?.data?.message || "Could not retrieve procurement data. Please check your network or login session."}
      </p>
      <button 
        onClick={() => refetch()}
        className="mt-8 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
      >
        <RefreshCcw size={14} /> Retry Sync
      </button>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter uppercase italic leading-none text-white">Negotiated Assets</h1>
            <p className="text-slate-500 font-bold text-sm tracking-wide mt-3 uppercase italic opacity-70">Secured Procurement Ledger</p>
          </div>
          <Link href="/dashboard" className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20">
            <ShoppingBag size={18} /> Create New RFQ
          </Link>
        </header>

        <div className="bg-[#0F172A] rounded-[3rem] border border-blue-900/20 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-900/10">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Product Asset</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vendor Entity</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Current Bid</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/10">
              {rfqs?.map((rfq: any) => {
                const status = rfq.status?.toUpperCase() || 'PENDING';
const canPay = status === 'ACCEPTED' || status === 'APPROVED';
              const isPaid = status === 'PAID';                
                return (
                  <tr key={rfq._id} className="hover:bg-blue-600/[0.03] transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                          <BarChart3 size={22} />
                        </div>
                        <div>
                          <p className="text-base font-black text-white">{rfq.productId?.name || "Standard Item"}</p>
                          <p className="text-[11px] text-slate-500 font-bold">QTY: {rfq.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-slate-300 uppercase tracking-tight">{rfq.vendorId?.organizationName || "Awaiting Vendor"}</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-lg font-black text-white tabular-nums">
                        ${((rfq.vendorCounterPrice || rfq.targetUnitPrice || 0) * rfq.quantity).toLocaleString()}
                      </p>
                      <p className="text-[9px] text-blue-500 font-black uppercase mt-1">Contract Total</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        isFinalized ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                      )}>
                        {status}
                      </span>
                    </td>
                   <td className="px-10 py-8 text-right">
                    {isPaid ? (
                      <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                        Payment Complete
                      </span>
                    ) : canPay ? (
                      // --- THE NEW PAYMENT BUTTON ---
                      <button 
                        onClick={() => paymentMutation.mutate(rfq._id)}
                        disabled={paymentMutation.isPending}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-black uppercase text-[10px] transition-all disabled:opacity-50"
                      >
                        {paymentMutation.isPending ? "Connecting..." : "Pay & Secure"}
                        <ArrowUpRight size={14} />
                      </button>
                    ) : (
                      <Link 
                        href={`/buyer/rfq/${rfq._id}`}
                        className="inline-flex items-center gap-2 bg-slate-800 text-slate-200 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase"
                      >
                        Negotiating
                      </Link>
                    )}
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {rfqs?.length === 0 && (
            <div className="p-32 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mb-6">
                <Inbox className="text-slate-700" size={40} />
              </div>
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">No Negotiated Goods Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}