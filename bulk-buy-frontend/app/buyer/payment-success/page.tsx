"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const rfqId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0F172A] border border-emerald-500/20 p-10 rounded-[3rem] text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-emerald-500" size={40} />
        </div>
        
        <h1 className="text-3xl font-[1000] text-white uppercase italic tracking-tighter">Transaction Secured</h1>
        <p className="text-slate-400 mt-4 font-bold text-sm leading-relaxed">
          Your procurement payment for RFQ <span className="text-emerald-400">#{rfqId?.slice(-6)}</span> has been verified and logged in the ledger.
        </p>

        <div className="mt-10 space-y-4">
          <Link 
            href="/buyer/rfq/list"
            className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Return to Ledger <ArrowRight size={16} />
          </Link>
          
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 text-slate-300 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-700 transition-all"
          >
            <ShoppingBag size={16} /> New Procurement
          </Link>
        </div>
      </motion.div>
    </div>
  );
}