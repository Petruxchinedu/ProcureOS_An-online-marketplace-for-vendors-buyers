"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  FileText,
  ExternalLink,
  ClipboardCheck
} from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti"; // Optional: npm install react-confetti
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const { data: rfq } = useQuery({
    queryKey: ["rfq-success", id],
    queryFn: async () => {
      const res = await api.get(`/rfq/${id}`);
      return res.data;
    }
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <Confetti 
        width={windowSize.width} 
        height={windowSize.height} 
        recycle={false} 
        numberOfPieces={200}
        colors={['#2563eb', '#10b981', '#0f172a']}
      />

      <div className="max-w-2xl w-full">
        {/* SUCCESS CARD */}
        <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative">
          
          {/* TOP ACCENT */}
          <div className="h-3 bg-emerald-500 w-full" />

          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-[2.5rem] mb-8 animate-bounce">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>

            <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase italic mb-4">
              Funds Secured
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto mb-10">
              Your payment of <span className="text-slate-900 font-black">${(rfq?.quantity * (rfq?.vendorCounterPrice || rfq?.targetUnitPrice))?.toLocaleString()}</span> has been successfully moved to the <span className="text-blue-600 font-bold">ProcureOS Escrow Ledger</span>.
            </p>

            {/* STATUS STEPPER */}
            <div className="grid grid-cols-3 gap-2 mb-12 relative">
                <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-slate-100 z-0" />
                
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Paid</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 animate-pulse">
                        <Package size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Packing</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Truck size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Transit</span>
                </div>
            </div>

            {/* TRANSACTION DETAILS */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-10 text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Reference</span>
                    <span className="text-sm font-bold text-slate-900">#ORD-{rfq?._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200/50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset</span>
                    <span className="text-sm font-bold text-slate-900 line-clamp-1">{rfq?.productId?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Logistics</span>
                    <span className="text-sm font-bold text-blue-600 italic">3-5 Business Days</span>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                    href="/buyer/rfq" 
                    className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                    <ClipboardCheck size={16} /> Manage All Orders
                </Link>
                <button 
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                    <FileText size={16} /> Download Receipt
                </button>
            </div>
          </div>

          <div className="bg-blue-600 p-4 text-center">
            <p className="text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
<span className="inline-block"><Lock size={12} /></span> Transaction Hash: {Math.random().toString(36).substring(2, 15).toUpperCase()}            </p>
          </div>
        </div>

        {/* HELP FOOTER */}
        <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Need Assistance? <Link href="/support" className="text-blue-600 hover:underline flex items-center gap-1">Contact Protocol Support <ExternalLink size={10} /></Link>
        </p>
      </div>
    </div>
  );
}