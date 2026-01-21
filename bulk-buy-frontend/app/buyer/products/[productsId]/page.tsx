"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Search, Filter, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function ProductMarketplace() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data;
    }
  });

  // EXECUTIVE SEARCH LOGIC
  const filteredProducts = products?.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse text-slate-400">ACCESSING GLOBAL INVENTORY...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter italic uppercase italic">Marketplace</h1>
            <p className="text-slate-500 font-bold text-xs tracking-[0.2em] mt-2">SECURE WHOLESALE PROCUREMENT TERMINAL</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search premium inventory..."
                className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <button className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
              <Filter size={20} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts?.map((product: any) => (
            <div key={product._id} className="bg-[#0F172A] rounded-[2.5rem] border border-slate-800/50 overflow-hidden hover:border-blue-500/50 transition-all group shadow-2xl">
              <div className="aspect-square bg-slate-800 relative">
                {product.images?.[0] ? (
                   <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-black tracking-widest uppercase text-[10px]">No Image</div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                        <Zap size={10} fill="currentColor" /> Verified Asset
                    </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-black mb-1 truncate">{product.name}</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">Supplier: {product.vendorId?.name || "Global Direct"}</p>
                
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Unit Price</p>
                        <p className="text-2xl font-[1000] text-blue-400">${product.pricePerUnit}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Min. Order</p>
                        <p className="text-sm font-bold">{product.minimumOrderQuantity} Units</p>
                    </div>
                </div>

                <Link 
                  href={`/buyer/rfq/create?productId=${product._id}`}
                  className="w-full py-4 bg-white text-black rounded-2xl font-[1000] text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5"
                >
                  Initiate Quote <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}