"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  ShieldCheck, ChevronLeft, ShoppingBag, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  // FIX: Match the folder name [productsId]
  const { productsId } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productsId],
    queryFn: async () => (await api.get(`/products/${productsId}`)).data,
    enabled: !!productsId
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-black animate-pulse uppercase tracking-widest">
      Decrypting Asset Data...
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* FIX: Link to the Marketplace instead of Dashboard */}
        <Link href="/buyer/products" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-black uppercase text-[10px] tracking-widest transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Return to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner">
            {product?.images?.[0] ? (
              <img src={product.images[0]} className="w-full h-full object-cover" alt={product.name} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200"><ShoppingBag size={80} /></div>
            )}
          </div>

          <div className="flex flex-col py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-8">
              <ShieldCheck size={14} /> Verified Enterprise Asset
            </div>

            <h1 className="text-6xl font-[1000] text-slate-900 mb-4 tracking-tighter italic uppercase">{product?.name}</h1>
            <p className="text-4xl font-[1000] text-blue-600 mb-10 tracking-tighter">
              ${product?.pricePerUnit} <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">/ unit</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Minimum Batch</p>
                 <p className="text-xl font-black text-slate-900 tracking-tighter">{product?.minimumOrderQuantity} Units</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                 <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Availability</p>
                 <p className="text-xl font-black text-emerald-700 tracking-tighter uppercase italic">In Stock</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4 border-b pb-2">Technical Description</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{product?.description}</p>
            </div>

            {/* Link to the RFQ Creation page we built */}
            <Link 
              href={`/buyer/rfq/create?productId=${product?._id}`}
              className="mt-auto w-full py-6 bg-slate-900 text-white rounded-[2rem] font-[1000] text-center text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 hover:shadow-blue-200"
            >
              Initiate Negotiation Terminal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}