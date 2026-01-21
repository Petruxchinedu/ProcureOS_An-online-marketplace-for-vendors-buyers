"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LifeBuoy, 
  MessageSquare, 
  ShieldAlert, 
  FileText, 
  Search, 
  ArrowRight, 
  Zap, 
  Globe, 
  Headphones,
  Send
} from "lucide-react";
import Link from "next/link";

export default function SupportTerminal() {
  const [ticketType, setTicketType] = useState("TECHNICAL");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 relative overflow-hidden">
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#1e293b_0%,_transparent_70%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      {/* HEADER */}
      <nav className="border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-10 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/buyer/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-[1000] tracking-tighter uppercase italic text-white">PROCURE<span className="text-blue-500">OS</span></span>
          </Link>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Support Status: <span className="text-emerald-500">Operational</span></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: GUIDES & FAQS */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-5xl font-[1000] tracking-tighter text-white uppercase italic leading-none mb-6">
                Command <span className="text-blue-500 text-opacity-80">Support</span>
              </h1>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed font-medium uppercase tracking-wide">
                Access technical documentation, dispute resolution protocols, and direct uplink to ProcureOS operators.
              </p>
            </div>

            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="SEARCH KNOWLEDGE BASE (E.G. ESCROW PROTOCOLS)" 
                className="w-full bg-[#0F172A] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:border-blue-500/50 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SupportCard 
                icon={ShieldAlert} 
                title="Dispute Center" 
                desc="Initiate mediation for delayed shipments or quality mismatches." 
                color="text-amber-500" 
              />
              <SupportCard 
                icon={FileText} 
                title="Documentation" 
                desc="Read our whitepaper on Smart Contract Execution and RFQ laws." 
                color="text-blue-500" 
              />
              <SupportCard 
                icon={Globe} 
                title="Logistics Support" 
                desc="Contact our global network of freight forwarding partners." 
                color="text-indigo-500" 
              />
              <SupportCard 
                icon={MessageSquare} 
                title="Community Hub" 
                desc="Discuss market trends with other high-volume procurement officers." 
                color="text-emerald-500" 
              />
            </div>
          </div>

          {/* RIGHT COLUMN: DIRECT UPLINK FORM */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F172A]/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Headphones size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">Direct Uplink</h2>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Est. response time: 14 Minutes</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Protocol</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["TECHNICAL", "BILLING", "DISPUTE", "OTHER"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTicketType(type)}
                        className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                          ticketType === type 
                          ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                          : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Brief description of issue"
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl px-5 py-4 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide all relevant RFQ IDs or Asset Reference codes..."
                    className="w-full bg-slate-900 border border-white/5 rounded-2xl px-5 py-4 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all resize-none"
                  />
                </div>

                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 group">
                  Transmit Ticket <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SupportCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="p-8 bg-[#0F172A] border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 transition-all group cursor-pointer">
      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-black uppercase italic text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-500 font-bold leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Initialize <ArrowRight size={14} />
      </div>
    </div>
  );
}