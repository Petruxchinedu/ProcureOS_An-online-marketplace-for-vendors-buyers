"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api as axios } from "@/lib/api";
import { 
  ArrowLeft, Calendar, Package, Clock, 
  MessageCircle, Building2, CheckCircle2, AlertCircle, 
  FileText, CreditCard, TrendingUp, ChevronRight, ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function RFQDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: rfq, isLoading } = useQuery({
    queryKey: ["rfq", id],
    queryFn: async () => {
      const res = await axios.get(`/rfq/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Mutation to accept counter-offers
  const acceptCounter = useMutation({
    mutationFn: async () => {
      return await axios.patch(`/rfq/${id}/status`, { status: "ACCEPTED" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rfq", id] });
      toast.success("Price Agreement Finalized");
    }
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Syncing Negotiation Ledger...</p>
    </div>
  );

  const isCountered = rfq?.status === "NEGOTIATING" && rfq?.vendorCounterPrice;
  const activePrice = isCountered ? rfq.vendorCounterPrice : rfq?.targetUnitPrice;
  const totalContractValue = activePrice * rfq?.quantity;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* GLOBAL STATUS BAR */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/buyer/rfq" className="flex items-center text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Procurement Ledger
          </Link>
          <div className="flex items-center gap-3">
             <ShieldCheck size={16} className="text-blue-600" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escrow Protected</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-8">
        
        {/* 🚀 DYNAMIC CALL TO ACTION SECTION */}
        <div className="mb-10">
          {rfq?.status === 'ACCEPTED' ? (
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-6">
                <div className="bg-blue-600 p-5 rounded-3xl shadow-lg shadow-blue-600/20">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-[1000] tracking-tighter italic uppercase">Contract Approved</h2>
                  <p className="text-slate-400 font-medium">Agreement reached at <span className="text-white font-black">${activePrice}/unit</span>. Secure payment required.</p>
                </div>
              </div>
              <Link 
href={`/buyer/rfq/${rfq._id}/pay`} // 🚀 UPDATED THIS LINE                className="relative z-10 w-full md:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 uppercase text-xs tracking-[0.2em]"
              >
                <CreditCard size={18} /> Initiate Escrow Payment
              </Link>
            </div>
          ) : isCountered ? (
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-[1000] tracking-tighter italic uppercase">Vendor Counter-Offer</h2>
                  <p className="text-blue-100 font-medium">The vendor proposed a new rate of <span className="text-white font-black">${rfq.vendorCounterPrice}/unit</span>.</p>
                </div>
              </div>
              <button 
                onClick={() => acceptCounter.mutate()}
                className="w-full md:w-auto px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-xl uppercase text-xs tracking-[0.2em]"
              >
                Accept New Price
              </button>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FINANCIAL TERMINAL & TIMELINE */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* FINANCIAL SUMMARY CARD */}
            <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm overflow-hidden relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b border-slate-100 pb-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested Volume</p>
                  <p className="text-3xl font-[1000] text-slate-900 tracking-tighter">{rfq?.quantity.toLocaleString()} <span className="text-sm font-bold text-slate-400">PCS</span></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Negotiated Unit</p>
                  <p className="text-3xl font-[1000] text-blue-600 tracking-tighter">${activePrice}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Contract</p>
                  <p className="text-3xl font-[1000] text-emerald-600 tracking-tighter">${totalContractValue.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <MessageCircle size={14} className="text-blue-500" /> Procurement Memo
                </h3>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 italic text-slate-600 leading-relaxed">
                  "{rfq?.message || "Standard bulk purchase agreement."}"
                </div>
              </div>
            </div>

            {/* UPGRADED TIMELINE */}
            <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm">
              <h2 className="text-xl font-[1000] text-slate-900 mb-8 uppercase tracking-tighter italic">Audit Trail</h2>
              <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <p className="font-black text-slate-900 text-sm">RFQ Initialized</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(rfq?.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-md ${
                    rfq?.status !== 'PENDING' ? 'bg-blue-600' : 'bg-slate-200'
                  }`}>
                    {rfq?.status !== 'PENDING' ? <CheckCircle2 size={12} className="text-white" /> : <Clock size={12} className="text-slate-500" />}
                  </div>
                  <p className="font-black text-slate-900 text-sm">Vendor Review</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {rfq?.status === 'PENDING' ? 'Awaiting Dispatch...' : `Actioned on ${new Date(rfq?.updatedAt).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: CONTEXT */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Asset Specification</h2>
              <div className="flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-slate-50 rounded-3xl flex items-center justify-center overflow-hidden mb-6 border border-slate-100">
                  {rfq?.productId?.images?.[0] ? (
                    <img src={rfq.productId.images[0]} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={48} className="text-slate-200" />
                  )}
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{rfq?.productId?.name}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter mb-6">SKU: {rfq?.productId?._id.slice(-8)}</p>
                
                <Link 
                  href={`/marketplace/${rfq?.productId?._id}`}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-600 border border-slate-200"
                >
                  View Original Listing
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Counterparty</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Building2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{rfq?.vendorId?.name || "Premium Vendor"}</p>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Verified Provider</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                  Always keep payments within the platform to maintain Escrow Protection and dispute rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}