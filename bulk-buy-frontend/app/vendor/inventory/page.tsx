"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Plus, Package, Edit3, Trash2, Loader2, 
  BarChart3, Boxes, DollarSign, ArrowUpRight,
  ShieldCheck, Search
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react"; // 1. Import useState

export default function VendorInventoryPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState(""); // 2. Add search state

  // DATA FETCHING
  const { data: products, isLoading } = useQuery({
    queryKey: ["vendor-products"],
    queryFn: async () => {
      const res = await api.get("/products/vendor/my-products"); 
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  // 3. FILTER LOGIC
  // We filter the products based on the name or category matching the search term
  const filteredProducts = products?.filter((product: any) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await api.delete(`/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
      toast.success("Asset purged from registry");
    },
    onError: () => toast.error("Authorization failed")
  });

  const handleDelete = (productId: string) => {
    if (confirm("CONFIRM ACTION: Permanently purge this asset?")) {
      deleteMutation.mutate(productId);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
      <p className="text-slate-500 font-black tracking-[0.3em] text-[10px] uppercase">Indexing Assets...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Asset Management</span>
            </div>
            <h1 className="text-5xl font-[1000] tracking-tighter uppercase italic">Inventory</h1>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* 4. CONNECTED SEARCH INPUT */}
            <div className="hidden lg:flex items-center gap-2 bg-[#0F172A] border border-blue-900/30 px-4 py-2 rounded-xl focus-within:border-blue-500 transition-all">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search Assets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on type
                className="bg-transparent outline-none text-xs font-bold w-48 placeholder:text-slate-700 text-white"
              />
            </div>
            <Link 
              href="/vendor/products/create" 
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <Plus size={18} /> New Product Listing
            </Link>
          </div>
        </div>

        {/* METRICS OVERVIEW (Uses products.length for total, but filteredProducts for display) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Active Listings", val: products?.length || 0, icon: Boxes, color: "text-blue-500" },
            { label: "Avg. Base Price", val: `$${(products?.reduce((acc:any, p:any) => acc + p.pricePerUnit, 0) / (products?.length || 1)).toFixed(2)}`, icon: DollarSign, color: "text-emerald-500" },
            { label: "Inventory Health", val: "Optimal", icon: ShieldCheck, color: "text-blue-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0F172A] p-6 rounded-[2rem] border border-blue-900/20 flex items-center gap-5">
              <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white tracking-tighter tabular-nums">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ASSET TABLE */}
        <div className="bg-[#0F172A] rounded-[3rem] border border-blue-900/20 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600/5 border-b border-blue-900/10">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Asset Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Classification</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Unit Valuation</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">MOQ Threshold</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-right">Terminal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/10">
                {/* 5. MAP OVER filteredProducts INSTEAD OF products */}
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product: any) => (
                    <tr key={product._id} className="hover:bg-blue-600/[0.03] transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-800 rounded-2xl overflow-hidden border border-blue-900/20 group-hover:border-blue-500/50 transition-all">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <Package size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="block font-black text-white italic uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">SKU-{product._id.slice(-6).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-lg font-[1000] text-white tabular-nums">${product.pricePerUnit}</span>
                        <span className="block text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em]">Base Unit Price</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <BarChart3 size={14} className="text-blue-500" />
                          <span className="font-black text-slate-300 tabular-nums">{product.minimumOrderQuantity} UNITS</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <Link 
                            href={`/vendor/edit/${product._id}`} 
                            className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all border border-blue-500/20"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id)} 
                            className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-32 text-center">
                      <Boxes className="mx-auto text-slate-800 mb-6" size={64} />
                      <p className="text-slate-500 font-black text-xl uppercase tracking-tighter italic">
                        {searchTerm ? "No matches found for search" : "No Assets Registered"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}