"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { Search, Filter, ArrowRight, Zap, Loader2, ShoppingBag, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProductsListPage() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("📡 Fetching products...");
      const res = await api.get("/products");
      console.log("✅ Products received:", res.data.length);
      return res.data;
    }
  });

  // Filter products based on search
  const filteredProducts = products?.filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse">
            Accessing Global Inventory...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">Error Loading Products</h2>
          <p className="text-slate-400 font-semibold mb-4">
            {(error as any)?.response?.data?.message || "Failed to fetch products"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 sm:mb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tighter italic uppercase">
              Marketplace
            </h1>
            <p className="text-slate-500 font-bold text-xs tracking-[0.2em] mt-2 uppercase">
              Secure Wholesale Procurement Terminal
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search premium inventory..."
                className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3 sm:py-4 pl-12 pr-6 text-sm focus:border-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <button className="bg-[#0F172A] p-3 sm:p-4 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
              <Filter size={20} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Product Count */}
        {filteredProducts && filteredProducts.length > 0 && (
          <p className="text-slate-400 font-semibold mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* PRODUCT GRID */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product: any) => (
              <div 
                key={product._id} 
                className="bg-[#0F172A] rounded-2xl sm:rounded-[2.5rem] border border-slate-800/50 overflow-hidden hover:border-blue-500/50 transition-all group shadow-2xl"
              >
                {/* Product Image */}
                <div className="aspect-square bg-slate-800 relative">
                  {product.images?.[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-black tracking-widest uppercase text-[10px]">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> Verified Asset
                    </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl font-black mb-1 truncate">{product.name}</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6 truncate">
                    Supplier: {product.vendorId?.email?.split('@')[0] || "Global Direct"}
                  </p>
                  
                  <div className="flex justify-between items-end mb-4 sm:mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Unit Price</p>
                      <p className="text-xl sm:text-2xl font-[1000] text-blue-400">${product.pricePerUnit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Min. Order</p>
                      <p className="text-xs sm:text-sm font-bold">{product.minimumOrderQuantity} Units</p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link 
                    href={`/buyer/products/${product._id}`}
                    className="w-full py-3 sm:py-4 bg-slate-800 text-white rounded-xl sm:rounded-2xl font-[1000] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl mb-2"
                  >
                    View Details <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </Link>

                  {/* Quick RFQ Button */}
                  <Link 
                    href={`/buyer/rfq/create?productId=${product._id}`}
                    className="w-full py-3 sm:py-4 bg-white text-black rounded-xl sm:rounded-2xl font-[1000] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5"
                  >
                    Request Quote <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {search ? "No products found" : "No products available"}
            </h3>
            <p className="text-slate-400 font-semibold">
              {search ? "Try a different search term" : "Check back later for new inventory"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}