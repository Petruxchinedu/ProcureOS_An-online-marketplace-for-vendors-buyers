"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  FileText, Download, CreditCard, Printer, 
  ArrowLeft, ShieldCheck, Lock, Loader2 
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function BuyerInvoicePage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: rfq, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const res = await api.get(`/rfq/${id}`);
      return res.data;
    }
  });

  // Handle the actual payment transition
  const executePayment = useMutation({
    mutationFn: async () => {
      // In a real app, this would happen after Stripe/PayPal success callback
      return await api.patch(`/rfq/${id}/status`, { status: "PAID" });
    },
    onSuccess: () => {
      toast.success("Payment Secured in Escrow");
      router.push(`/buyer/rfq/${id}/success`); // Redirect to a success/thank you page
    }
  });

  if (isLoading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Generating Ledger Entry...</p>
    </div>
  );

  // SENIOR LOGIC: Priority Price Selection
  // If there's a counter price, use it. Otherwise, use target price.
  const finalUnitPrice = rfq.vendorCounterPrice || rfq.targetUnitPrice;
  const subtotal = rfq.quantity * finalUnitPrice;
  const platformFee = subtotal * 0.03; // Professional B2B platforms use service fees
  const total = subtotal + platformFee;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/buyer/rfq/${id}`} className="flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Negotiation
        </Link>
        <div className="flex gap-3">
            <button onClick={() => window.print()} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                <Printer size={20} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                <Download size={20} />
            </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-3xl border border-slate-100 overflow-hidden">
        {/* Top Trust Banner */}
        <div className="bg-blue-600 px-12 py-3 flex justify-center items-center gap-3">
           <ShieldCheck size={14} className="text-white" />
           <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Transaction Protected by ProcureOS Escrow</span>
        </div>

        {/* Invoice Header */}
        <div className="p-12 border-b border-slate-50 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-[1000] text-slate-900 tracking-tighter italic">INVOICE</h1>
            <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em]">REF: {rfq._id.slice(-12).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <div className="bg-slate-900 text-white px-4 py-2 rounded-lg inline-block font-black text-sm italic mb-2">
                BULKBUY<span className="text-blue-500">.OS</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-tight">Official Marketplace<br/>Record</p>
          </div>
        </div>

        {/* Participant Info */}
        <div className="grid grid-cols-2 p-12 gap-20 border-b border-slate-50">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Remit To (Vendor)</p>
            <div>
                <p className="text-xl font-black text-slate-900">{rfq.vendorId?.name || "Verified Partner"}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">Authorized Fulfillment Center</p>
            </div>
          </div>
          <div className="text-right space-y-4">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Billed To (Buyer)</p>
            <div>
                <p className="text-xl font-black text-slate-900">{rfq.buyerId?.name}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">{rfq.buyerId?.email}</p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="p-12">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract Description</th>
                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Volume</th>
                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Rate</th>
                <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-8">
                  <p className="font-black text-slate-900 text-lg leading-none">{rfq.productId?.name}</p>
                  <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-tighter italic">Bulk Fulfillment Order</p>
                </td>
                <td className="py-8 text-center font-bold text-slate-700">{rfq.quantity.toLocaleString()}</td>
                <td className="py-8 text-right font-bold text-slate-700">${finalUnitPrice.toLocaleString()}</td>
                <td className="py-8 text-right font-[1000] text-slate-900 text-lg">${subtotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="mt-12 pt-12 border-t border-slate-100 flex justify-end">
            <div className="w-72 space-y-4">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-black uppercase tracking-widest">Merchandise Subtotal</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-black uppercase tracking-widest">Platform Service (3%)</span>
                <span className="font-bold">${platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t-2 border-slate-900">
                <span className="text-xs font-[1000] uppercase tracking-tighter text-slate-900">Grand Total (USD)</span>
                <span className="text-4xl font-[1000] text-blue-600 tracking-tighter italic">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-10 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                    <Lock size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-0.5">Escrow Guarantee</p>
                    <p className="text-[10px] text-slate-400 font-bold leading-tight uppercase">Funds are held by BulkBuy until<br/>shipment is verified by you.</p>
                </div>
            </div>
            
            <button 
              onClick={() => executePayment.mutate()}
              disabled={executePayment.isPending}
              className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-[1000] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl uppercase text-xs tracking-[0.2em] group"
            >
              {executePayment.isPending ? (
                  <Loader2 className="animate-spin" />
              ) : (
                <>
                    <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
                    Authorize & Secure Funds
                </>
              )}
            </button>
        </div>
      </div>
    </div>
  );
}