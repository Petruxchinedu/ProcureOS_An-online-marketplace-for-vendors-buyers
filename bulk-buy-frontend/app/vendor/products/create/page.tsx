"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner"; // Using sonner for cleaner executive toasts
import { 
  Plus, Check, ArrowLeft, Loader2, 
  DollarSign, Boxes, Tag, AlignLeft, Image as ImageIcon,
  ShieldCheck, Globe, Info
} from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateProductPage() {
  const queryClient = useQueryClient(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerUnit: "",
    minimumOrderQuantity: "",
    category: "",
    imageUrl: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/products", {
        ...formData,
        pricePerUnit: Number(formData.pricePerUnit),
        minimumOrderQuantity: Number(formData.minimumOrderQuantity),
        images: formData.imageUrl ? [formData.imageUrl] : []
      });
      queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
      toast.success("ASSET REGISTERED: Catalog updated successfully.");
      router.push("/vendor/inventory"); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Protocol Error: Failed to list product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP NAVIGATION */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/vendor/inventory" className="flex items-center text-slate-500 hover:text-blue-400 transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Exit Terminal
          </Link>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/5 border border-blue-500/20 rounded-full">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Secure Asset Registration</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: THE FORM DATA */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-6xl font-[1000] tracking-tighter uppercase italic leading-none">Initialize <span className="text-blue-600">Asset</span></h1>
              <p className="text-slate-500 font-bold mt-4 uppercase text-xs tracking-widest">Global Marketplace Provisioning Terminal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* PRIMARY IDENTITY */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Globe size={14}/> Product Identity
                </label>
                <input 
                  required 
                  placeholder="EX: QUANTUM-GRADE SEMICONDUCTOR..." 
                  className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-black text-lg placeholder:text-slate-800 italic uppercase"
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              {/* FINANCIALS & LOGISTICS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <DollarSign size={14} className="text-blue-500"/> Price Per Unit (USD)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      required 
                      placeholder="0.00" 
                      className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-black text-xl tabular-nums placeholder:text-slate-800"
                      onChange={e => setFormData({...formData, pricePerUnit: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Boxes size={14} className="text-blue-500"/> MOQ Threshold
                  </label>
                  <input 
                    type="number" 
                    required 
                    placeholder="1000" 
                    className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-black text-xl tabular-nums placeholder:text-slate-800"
                    onChange={e => setFormData({...formData, minimumOrderQuantity: e.target.value})} 
                  />
                </div>
              </div>

              {/* METADATA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Tag size={14} className="text-blue-500"/> Market Classification
                  </label>
                  <input 
                    required 
                    placeholder="ELECTRONICS / RAW MATERIAL" 
                    className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-bold text-sm uppercase placeholder:text-slate-800"
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-500"/> Asset Visual URL
                  </label>
                  <input 
                    placeholder="HTTPS://CDN.PROCURE.OS/IMAGE.JPG" 
                    className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-bold text-sm placeholder:text-slate-800"
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <AlignLeft size={14} className="text-blue-500"/> Strategic Memo / Description
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Detail high-level specifications and technical compliance..." 
                  className="w-full p-6 bg-[#0F172A] border border-blue-900/20 rounded-3xl outline-none focus:border-blue-500 transition-all font-medium text-slate-300 leading-relaxed placeholder:text-slate-800"
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <button 
                disabled={loading} 
                className="w-full py-8 bg-blue-600 text-white font-[1000] rounded-[2rem] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.3)] text-xl italic uppercase tracking-[0.2em] active:scale-95 disabled:opacity-50 group"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Check size={24} /> Authorize & List Asset</>}
              </button>
            </form>
          </div>

          {/* RIGHT: REAL-TIME PREVIEW CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="bg-[#0F172A] border border-blue-900/20 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
              
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Asset Preview (Live)</h3>
              
              <div className="w-full aspect-square bg-slate-900 rounded-[2rem] mb-8 overflow-hidden border border-blue-900/10 flex items-center justify-center">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center space-y-4">
                    <ImageIcon size={48} className="mx-auto text-slate-800" />
                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Awaiting Visual Uplink</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Asset Identity</p>
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter truncate">
                    {formData.name || "UNNAMED_ASSET"}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-blue-900/10">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Unit Value</p>
                    <p className="text-xl font-black italic tracking-tighter text-emerald-500">
                      ${formData.pricePerUnit || "0.00"}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-blue-900/10">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">MOQ Threshold</p>
                    <p className="text-xl font-black italic tracking-tighter">
                      {formData.minimumOrderQuantity || "0"} <span className="text-[10px] text-slate-600">PCS</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                  <Info size={16} className="text-amber-500 shrink-0" />
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">
                    Verification Protocol: Listings are subject to ProcureOS quality standards. Ensure documentation is ready.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}