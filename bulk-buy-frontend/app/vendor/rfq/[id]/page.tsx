"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { 
  ArrowLeft, CheckCircle, XCircle, Package, User, 
  Loader2, DollarSign, MessageSquare, ShieldCheck, 
  Zap, TrendingUp, RefreshCcw, Tag, Box 
} from "lucide-react";
import Link from "next/link";

export default function VendorRFQDetail() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [isCountering, setIsCountering] = useState(false);
  const [counterPrice, setCounterPrice] = useState("");

  const { data: rfq, isLoading } = useQuery({
    queryKey: ["rfq-detail", id],
    queryFn: async () => {
      const res = await api.get(`/rfq/${id}`);
      return res.data;
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ status, price }: { status: string; price?: number }) => {
      return await api.patch(`/rfq/${id}/status`, { 
        status, 
        vendorCounterPrice: price 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rfq-detail", id] });
      toast.success("Terminal Updated Successfully");
      router.push("/vendor/rfq");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Transmission Error");
    }
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/50">Accessing Secure Lead...</p>
    </div>
  );

  if (!rfq) return <div className="p-20 text-center text-white font-black">RFQ DATA NOT FOUND.</div>;

  const totalOfferValue = rfq.quantity * rfq.targetUnitPrice;
  const product = rfq.productId; // The product data is here

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-24">
      {/* HEADER NAV */}
      <div className="bg-[#0F172A]/80 border-b border-blue-900/30 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/vendor/rfq" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-900/20 rounded-lg group-hover:bg-blue-800/40 border border-blue-800/20 transition-all">
              <ArrowLeft size={16} className="text-blue-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400">Exit Terminal</span>
          </Link>
          <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Identity Verified</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT SECTION: INTEL & PRODUCT DATA */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* PRODUCT VISUALIZATION CARD */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-48 bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden flex-shrink-0">
                {product?.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-500/20">
                    <Package size={64} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[8px] font-black text-blue-400 uppercase tracking-widest">Selected Asset</span>
                  <span className="text-slate-500 text-[10px] font-bold">Category: {product?.category || "Industrial"}</span>
                </div>
                <h2 className="text-3xl font-[1000] tracking-tighter text-white uppercase italic leading-tight">
                  {product?.name || "Unknown Product"}
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Market Price</p>
                    <p className="text-lg font-black text-white">${product?.pricePerUnit || 0}</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">In Stock</p>
                    <p className="text-lg font-black text-blue-400">{product?.stock || 0} Units</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-[3rem] border border-blue-900/30 overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-blue-900/20 flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-[1000] tracking-tighter text-white uppercase italic">Deal Analysis</h1>
                <p className="text-blue-400/60 text-xs font-black tracking-[0.2em] mt-2">UUID: {rfq._id.slice(-12)}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${
                rfq.status === 'PENDING' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
              }`}>
                {rfq.status}
              </div>
            </div>

            <div className="p-10">
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10 relative overflow-hidden group">
                  <Package className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:text-blue-500/10 transition-colors" />
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Requested Volume</p>
                  <p className="text-3xl font-black text-white">{rfq.quantity.toLocaleString()} <span className="text-xs text-slate-500">Units</span></p>
                </div>
                <div className="bg-[#1E293B]/40 p-6 rounded-[2rem] border border-blue-900/10">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Proposed Unit Price</p>
                  <p className="text-3xl font-black text-white">${rfq.targetUnitPrice}</p>
                </div>
              </div>

              {/* BUYER PROFILE CARD */}
              <div className="flex items-center gap-6 p-6 bg-[#1E293B]/20 rounded-[2rem] border border-blue-900/10 mb-10">
                 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <User size={32} className="text-white" />
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Procurement Officer</p>
                    <h3 className="text-xl font-black text-white">{rfq.buyerId?.name || "Corporate Buyer"}</h3>
                    <p className="text-xs text-blue-400 font-bold">{rfq.buyerId?.email}</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Buyer Requirements</span>
                </div>
                <div className="bg-[#1E293B]/50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-slate-300 text-sm leading-relaxed">
                  "{rfq.message || "Implicit commitment. No additional memo provided."}"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: EXECUTIVE ACTIONS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 relative overflow-hidden group">
            <Zap className="absolute -right-4 -top-4 w-32 h-32 text-white/10 rotate-12" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2">Contract Liquidity</p>
            <h3 className="text-5xl font-[1000] tracking-tighter">${totalOfferValue.toLocaleString()}</h3>
            <div className="mt-8 flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/10 backdrop-blur-md">
              <TrendingUp size={16} className="text-emerald-400" />
              <p className="text-[10px] font-bold text-blue-50 tracking-tight uppercase italic">Total Negotiated Value</p>
            </div>
          </div>

          {/* ACTION PANEL */}
          <div className="bg-white rounded-[3rem] p-10 text-slate-900 shadow-2xl relative">
            <h2 className="text-2xl font-[1000] tracking-tighter mb-8 uppercase text-center">Execute Decision</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => updateStatus.mutate({ status: "ACCEPTED" })}
                disabled={updateStatus.isPending || isCountering}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50"
              >
                <CheckCircle size={18} /> Approve Contract
              </button>

              {!isCountering ? (
                <button 
                  onClick={() => setIsCountering(true)}
                  className="w-full py-6 bg-slate-900 text-white hover:bg-blue-600 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all"
                >
                  <RefreshCcw size={18} /> Initiate Counter
                </button>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      autoFocus
                      type="number"
                      placeholder="Enter Counter Unit Price..."
                      value={counterPrice}
                      onChange={(e) => setCounterPrice(e.target.value)}
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-lg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus.mutate({ status: "NEGOTIATING", price: Number(counterPrice) })}
                      disabled={updateStatus.isPending}
                      className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase"
                    >
                      {updateStatus.isPending ? "Sending..." : "Send Offer"}
                    </button>
                    <button 
                      onClick={() => setIsCountering(false)}
                      className="px-6 py-4 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <button 
                onClick={() => updateStatus.mutate({ status: "REJECTED" })}
                disabled={updateStatus.isPending}
                className="w-full py-4 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mt-4"
              >
                Permanently Decline
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}