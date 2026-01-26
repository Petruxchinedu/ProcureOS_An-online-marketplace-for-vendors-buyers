"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import {
  Download,
  ArrowLeft,
  Printer,
  ShieldCheck,
  Building2,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function VendorInvoiceDetail() {
  const { id } = useParams(); // id === rfqId
  const router = useRouter();

  const { data: invoice, isLoading } = useQuery({
    queryKey: ["vendor-invoice", id],
    queryFn: async () => {
      const res = await api.get(`/orders/${id}/invoice`);
      return res.data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 animate-pulse font-black uppercase tracking-[0.5em]">
        Fetching Ledger...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500 font-black uppercase">
        Invoice Not Found
      </div>
    );
  }

  const dealValue = invoice.total;
  const platformFee = dealValue * 0.02;
  const netRevenue = dealValue - platformFee;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-12">
      <div className="max-w-4xl mx-auto">

        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 font-bold uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Terminal
        </button>

        {/* INVOICE */}
        <div className="bg-[#0F172A] border border-blue-900/30 rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="bg-blue-600 h-2 w-full" />

          <div className="p-8 md:p-16">
            {/* Header */}
            <div className="flex justify-between items-start mb-16">
              <div>
                <div className="flex items-center gap-2 text-blue-500 mb-4">
                  <Zap size={24} className="fill-current" />
                  <span className="font-black tracking-tighter text-2xl italic uppercase">
                    ProcureOS
                  </span>
                </div>
                <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter">
                  Tax Invoice
                </h1>
                <p className="text-slate-500 font-mono text-sm uppercase">
                  {invoice.invoiceNumber}
                </p>
              </div>

              <div className="text-right">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={14} /> {invoice.status}
                </span>
                <p className="mt-4 text-slate-400 font-bold text-sm">
                  Issued: {new Date(invoice.issuedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  From (Vendor)
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="font-black text-white italic">
                      {invoice.vendor?.name || "Vendor"}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {invoice.vendor?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                  Bill To (Buyer)
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-700">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="font-black text-white italic">
                      {invoice.buyer?.organizationName || invoice.buyer?.name}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {invoice.buyer?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Item */}
            <div className="border-y border-blue-900/20 py-8 mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="pb-4">Asset</th>
                    <th className="pb-4 text-center">Qty</th>
                    <th className="pb-4 text-right">Unit</th>
                    <th className="pb-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  <tr>
                    <td className="py-4 italic uppercase">
                      {invoice.product?.name}
                    </td>
                    <td className="py-4 text-center">
                      {invoice.quantity}
                    </td>
                    <td className="py-4 text-right">
                      ${invoice.unitPrice.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-emerald-400">
                      ${dealValue.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex justify-between w-64 text-sm font-bold text-slate-500">
                <span>Subtotal</span>
                <span className="text-white">${dealValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-64 text-sm font-bold text-slate-500">
                <span>Platform Fee (2%)</span>
                <span className="text-white">-${platformFee.toLocaleString()}</span>
              </div>
              <div className="h-px bg-blue-900/30 w-64 my-2" />
              <div className="flex justify-between w-64 items-center">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                  Net Revenue
                </span>
                <span className="text-3xl font-[1000] text-white tracking-tighter italic">
                  ${netRevenue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-blue-900/10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-500/50 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={16} /> Secured by ProcureOS
              </div>
              <div className="flex gap-4">
                <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl">
                  <Printer size={18} />
                </button>
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
