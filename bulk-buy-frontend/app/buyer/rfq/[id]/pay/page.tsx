"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  ShieldCheck, CreditCard, Landmark, Zap, 
  ArrowRight, Lock, CheckCircle2, FileText, Download 
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function BuyerPaymentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(false);

  const { data: rfq, isLoading } = useQuery({
    queryKey: ["rfq-payment", id],
    queryFn: async () => {
      const res = await api.get(`/rfq/${id}`);
      return res.data;
    }
  });

  const processPayment = useMutation({
    mutationFn: async () => {
      return await api.patch(`/rfq/${id}/status`, { status: "PAID" });
    },
    onSuccess: () => {
      setIsPaid(true);
      toast.success("Funds Secured in Escrow");
    }
  });

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-black text-blue-500 animate-pulse uppercase tracking-[0.4em]">Establishing Secure Connection...</div>;

  const total = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto py-12">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest mb-4">
            <Lock size={12} /> {isPaid ? "Transaction Finalized" : "Encrypted Escrow Terminal"}
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter italic uppercase">
            {isPaid ? "Payment Secured" : "Finalize Contract"}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: PAYMENT OR SUCCESS INFO */}
          <div className="space-y-4">
            {!isPaid ? (
              <>
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Select Funding Source</h2>
                <button className="w-full bg-[#0F172A] border-2 border-blue-600 p-6 rounded-[2rem] flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]"><CreditCard size={24} /></div>
                    <div>
                      <p className="font-black italic uppercase text-sm">Corporate Card</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Visa / Mastercard / Amex</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-blue-600 bg-white" />
                </button>
              </>
            ) : (
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2.5rem] space-y-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase italic">Escrow Active</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">
                    Your funds are held securely. The vendor has been notified to begin fulfillment.
                  </p>
                </div>
                <div className="pt-4 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all">
                    <Download size={16} /> Download Tax Invoice
                  </button>
                  <button 
                    onClick={() => router.push('/buyer/dashboard')}
                    className="w-full text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: EXECUTION SUMMARY */}
          <div className="bg-[#0F172A] border border-blue-900/20 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden h-fit">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 uppercase">Execution Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400">Product</span>
                <span className="text-white italic uppercase">{rfq.productId?.name}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400">Total Units</span>
                <span className="text-white">{rfq.quantity.toLocaleString()}</span>
              </div>
              <div className="h-px bg-blue-900/20" />
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Amount Due</span>
                <span className="text-4xl font-[1000] tracking-tighter text-white tabular-nums italic">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            {!isPaid && (
              <button 
                onClick={() => processPayment.mutate()}
                disabled={processPayment.isPending}
                className="w-full bg-blue-600 hover:bg-emerald-500 text-white hover:text-black py-5 rounded-[1.5rem] font-[1000] uppercase italic tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
              >
                {processPayment.isPending ? "AUTHORIZING..." : "EXECUTE PAYMENT"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}