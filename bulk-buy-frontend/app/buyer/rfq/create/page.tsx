"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { 
  Hash, DollarSign, ArrowLeft, ShoppingBag, 
  ShieldCheck, Loader2, ChevronRight, Zap, 
  Calculator, MessageSquare, TrendingDown
} from "lucide-react";
import Link from "next/link";

function RFQForm() {
  const router = useRouter();
  const params = useSearchParams();
  const productId = params.get("productId");

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);

  useEffect(() => {
    if (!productId) {
      toast.error("Protocol Error: No asset selected.");
      router.push("/dashboard");
      return;
    }

    api.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setQuantity(res.data.minimumOrderQuantity?.toString() || "");
        setTargetPrice(res.data.pricePerUnit?.toString() || "");
      })
      .catch(() => {
        toast.error("Could not synchronize asset details");
        router.push("/dashboard");
      })
      .finally(() => setFetchingProduct(false));
  }, [productId, router]);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("-> Submission Triggered");

    if (loading) return;
    
    // Validate Message
    if (!message || message.trim().length < 5) {
      toast.error("Please enter a negotiation memo (min 5 chars)");
      return;
    }

    setLoading(true);
    console.log("-> Data Validation Passed. Attempting API Call...");

    try {
      const payload = {
        productId,
        quantity: Number(quantity),
        targetUnitPrice: Number(targetPrice),
        message: message.trim(),
      };

      const response = await api.post("/rfq", payload);
      console.log("-> API Response:", response.data);
      
      toast.success("PROPOSAL PUSHED TO VENDOR");
      
      // Navigate to the list
      router.push("/buyer/rfq/list");
      router.refresh();
      
    } catch (err: any) {
      console.error("-> API ERROR:", err);
      const errorMsg = err.response?.data?.message || "Transmission Failure";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  const currentTotal = (Number(quantity) || 0) * (Number(targetPrice) || 0);
  const isNegotiatingLower = product ? Number(targetPrice) < product.pricePerUnit : false;

  if (fetchingProduct) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617]">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/50">Establishing Secure Channel</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-20">
      <div className="bg-[#0F172A]/80 border-b border-blue-900/30 px-8 py-6 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-900/20 rounded-lg group-hover:bg-blue-800/40 transition-all border border-blue-800/20">
              <ArrowLeft size={16} className="text-blue-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cancel Protocol</span>
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} className="animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Secure Handshake</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32 self-start">
            <div className="bg-[#0F172A] rounded-[2.5rem] border border-blue-900/30 overflow-hidden shadow-2xl">
               <div className="aspect-square bg-slate-900 relative">
                  {product?.images?.[0] ? (
                    <img src={product.images[0]} className="w-full h-full object-cover opacity-80" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-900"><ShoppingBag size={48} /></div>
                  )}
               </div>
               <div className="p-8">
                  <h1 className="text-xl font-black tracking-tight text-white mb-2 uppercase italic">{product?.name}</h1>
                  <div className="flex items-center justify-between p-4 bg-[#1E293B]/50 rounded-xl border border-blue-900/20">
                     <span className="text-[10px] font-black text-blue-400">Benchmark</span>
                     <span className="text-sm font-black text-white">${product?.pricePerUnit}</span>
                  </div>
               </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <Zap className="absolute -right-4 -top-4 w-32 h-32 text-white/10 rotate-12" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2">Total Bid Value</p>
               <h3 className="text-5xl font-[1000] tracking-tighter italic">${currentTotal.toLocaleString()}</h3>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-[#0F172A] rounded-[3rem] border border-blue-900/30 p-10 md:p-16 shadow-2xl">
              <form onSubmit={handleManualSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase text-blue-400/80">Asset Quantity</label>
                    <div className="group relative">
                      <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      <input
                        type="number"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full pl-14 pr-6 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-2xl text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase text-blue-400/80">Proposed Unit Price</label>
                    <div className="group relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        className="w-full pl-14 pr-6 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none font-black text-2xl text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase text-blue-400/80 flex items-center gap-2">
                    <MessageSquare size={14} /> Negotiation Memo
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-8 py-6 bg-[#1E293B]/40 border-2 border-transparent rounded-[1.5rem] focus:border-blue-500 transition-all outline-none resize-none text-slate-300"
                    placeholder="Describe shipping/terms requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-white text-[#020617] hover:bg-blue-500 hover:text-white transition-all font-[1000] rounded-[2rem] shadow-2xl disabled:opacity-50 flex justify-center items-center gap-3 text-lg uppercase tracking-widest italic"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Push Proposal to Vendor <ChevronRight size={20} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CreateRFQPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center font-black text-blue-900 uppercase">Syncing...</div>}>
      <RFQForm />
    </Suspense>
  );
}