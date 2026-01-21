"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, ArrowRight, ShieldCheck, Zap,
  Clock, CheckCircle2, Package, 
  ArrowUpRight, Bell, CreditCard, X, Truck,
  TrendingUp, BarChart3, Layers, Menu, ShoppingCart, BookOpen, Headphones
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils"; // Ensure you have this utility or use template literals

export default function EliteBuyerDashboard() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. DATA ACQUISITION
  const { data: rfqs, isLoading: rfqsLoading } = useQuery({
    queryKey: ["buyer-rfqs-dashboard"],
    queryFn: async () => {
      const res = await api.get("/rfq/buyer");
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await api.get("/products")).data
  });

  // 2. INTELLIGENT ANALYTICS
  const chartData = [
    { name: 'Mon', spend: 4000 }, { name: 'Tue', spend: 3000 },
    { name: 'Wed', spend: 9000 }, { name: 'Thu', spend: 5000 },
    { name: 'Fri', spend: 12000 }, { name: 'Sat', spend: 8000 },
  ];

  const stats = useMemo(() => ({
    total: rfqs?.length || 0,
    active: rfqs?.filter((r: any) => ["PENDING", "NEGOTIATING"].includes(r.status)).length || 0,
    secured: rfqs?.filter((r: any) => ["PAID", "SHIPPED"].includes(r.status)).length || 0,
    volume: rfqs?.reduce((acc: number, curr: any) => acc + (curr.quantity * curr.targetUnitPrice), 0) || 0
  }), [rfqs]);

  if (rfqsLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Initialising Protocol</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500 selection:text-white pb-20">
      
      {/* GLOW OVERLAYS */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-[#020617] z-[100] p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-black italic tracking-tighter uppercase">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X /></button>
            </div>
            <div className="space-y-8">
              <MobileLink href="/buyer/products" icon={ShoppingCart} label="Marketplace" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileLink href="/buyer/rfq/list" icon={BookOpen} label="Ledger" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileLink href="/support" icon={Headphones} label="Support" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION OVERLAY (Keep as per original) */}
      <AnimatePresence>
        {isNotifOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNotifOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0F172A]/90 backdrop-blur-2xl border-l border-white/10 z-[70] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black uppercase italic tracking-tighter">Activity Stream</h2>
                <button onClick={() => setIsNotifOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-blue-600/20 to-transparent border-l-4 border-blue-500 rounded-r-2xl">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Contract Update</p>
                    <p className="text-sm font-bold">Supplier #402 has countered your offer for Steel Tubing.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* NAV BAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-10 py-5">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link href="/buyer/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="text-2xl font-[1000] tracking-tighter uppercase italic text-white">PROCURE<span className="text-blue-500 text-opacity-80 underline decoration-blue-500/30">OS</span></span>
          </Link>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <Link href="/buyer/products" className="hover:text-blue-400 transition-colors">Marketplace</Link>
                <Link href="/buyer/rfq/list" className="hover:text-blue-400 transition-colors">Ledger</Link>
                <Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4 border-l border-white/10 pl-4 lg:pl-8">
              <button onClick={() => setIsNotifOpen(true)} className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10 items-center justify-center font-black text-xs">JD</div>
              
              {/* MOBILE TOGGLE */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-10 pt-12 space-y-10">
        
        {/* TOP ROW: STATS & MINI CHART */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Pipeline Value" value={`$${(stats.volume / 1000).toFixed(1)}k`} sub="Total Negotiated" icon={TrendingUp} />
            <StatCard label="Active Escrow" value={stats.secured} sub="Protected Funds" icon={ShieldCheck} highlight />
            <StatCard label="Open Requests" value={stats.active} sub="Waiting for Vendor" icon={Clock} />
          </div>
          <div className="lg:col-span-4 bg-[#0F172A] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 size={100} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic">Spend Velocity</p>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="spend" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* MIDDLE ROW: LIVE LEDGER */}
        <section className="bg-[#0F172A]/50 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-sm">
          <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Live Execution Terminal</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time status of all active procurement contracts</p>
            </div>
            <Link href="/buyer/rfq/list" className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl transition-all">
              <Layers size={20} className="text-slate-400" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-black/20">
                  <th className="px-10 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Asset Reference</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Protocol Status</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Counterparty</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rfqs?.map((rfq: any) => (
                  <tr key={rfq._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="font-black text-white text-sm uppercase italic tracking-tight">{rfq.productId?.name}</p>
                          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">ID: {rfq._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                      <StatusBadge status={rfq.status} />
                    </td>
                    <td className="px-6 py-8">
                      <p className="text-xs font-bold text-slate-400 uppercase italic">Confidential Supplier</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <ActionSwitcher rfq={rfq} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM ROW: INVENTORY GRID */}
        <section>
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h2 className="text-3xl font-[1000] tracking-tighter uppercase italic text-white leading-none">Global Marketplace</h2>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mt-3">Verified Assets Only</p>
            </div>
            <Link href="/buyer/products" className="group py-3 px-6 bg-[#0F172A] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all flex items-center gap-3">
              Browse Terminal <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function StatCard({ label, value, sub, icon: Icon, highlight = false }: any) {
  return (
    <div className={`p-8 rounded-[2.5rem] border ${highlight ? 'bg-blue-600 border-blue-400 text-white shadow-2xl shadow-blue-500/20' : 'bg-[#0F172A] border-white/5 text-slate-300'}`}>
      <div className="flex justify-between items-start mb-6">
        <Icon size={24} className={highlight ? 'text-white' : 'text-blue-500'} />
        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${highlight ? 'bg-white/20' : 'bg-white/5'}`}>Live</span>
      </div>
      <p className="text-4xl font-[1000] tracking-tighter mb-1">{value}</p>
      <div className="flex items-center gap-2">
        <p className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>{label}</p>
        <span className="w-1 h-1 rounded-full bg-slate-500 opacity-30" />
        <p className="text-[10px] font-bold italic opacity-60">{sub}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const themes: any = {
    PAID: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    SHIPPED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    ACCEPTED: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    PENDING: "text-amber-400 bg-amber-400/10 border-amber-400/20"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${themes[status] || 'text-slate-400 bg-slate-400/10'}`}>
      {status}
    </span>
  );
}

function ActionSwitcher({ rfq }: any) {
  const baseClass = "px-6 py-2.5 rounded-xl font-[1000] text-[10px] uppercase tracking-widest transition-all inline-flex items-center gap-2";
  
  if (rfq.status === 'ACCEPTED') return (
    <Link href={`/buyer/invoice/${rfq._id}`} className={`${baseClass} bg-blue-600 text-white hover:bg-white hover:text-black shadow-lg shadow-blue-500/10`}>
      <CreditCard size={14} /> Finalize Payment
    </Link>
  );

  if (rfq.status === 'PAID') return (
    <Link href={`/buyer/rfq/${rfq._id}/success`} className={`${baseClass} bg-emerald-600/20 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-600 hover:text-white`}>
      <ShieldCheck size={14} /> Proof of Escrow
    </Link>
  );

  return (
    <Link href={`/buyer/rfq/${rfq._id}`} className="text-slate-500 hover:text-white transition-colors">
      <ArrowRight size={22} />
    </Link>
  );
}

function ProductCard({ product }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group bg-[#0F172A] rounded-[2.5rem] border border-white/5 p-4 overflow-hidden shadow-xl">
      <div className="aspect-square bg-slate-800 rounded-[2rem] mb-6 overflow-hidden relative">
        <img src={product.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
        <div className="absolute top-4 left-4">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black tracking-tighter uppercase flex items-center gap-1 border border-white/10">
                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" /> Asset Verified
            </div>
        </div>
      </div>
      <div className="px-2 pb-2">
        <h3 className="font-black text-white text-lg tracking-tight uppercase italic truncate mb-1">{product.name}</h3>
        <p className="text-blue-500 font-[1000] text-2xl mb-6">${product.pricePerUnit}</p>
        <Link href={`/buyer/products/${product._id}`} className="w-full py-4 bg-white/5 hover:bg-blue-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2">
          View Detail <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}