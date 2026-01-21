"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "@/lib/auth";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, ShieldAlert, Send, RefreshCw, CheckCircle2 } from "lucide-react";

export default function EliteForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, watch } = useForm<{ email: string }>();

  const emailValue = watch("email");

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email);
      setIsSubmitted(true);
      toast.success("Recovery Protocol Initiated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Recovery sequence failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        {/* BACK LINK */}
        <Link 
          href="/login" 
          className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Return to Terminal
        </Link>

        <div className="bg-[#0F172A]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="request"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-8">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center border border-amber-500/20 mb-6">
                    <ShieldAlert size={24} />
                  </div>
                  <h1 className="text-2xl font-[1000] text-white uppercase italic tracking-tighter">
                    Access <span className="text-blue-500">Recovery</span>
                  </h1>
                  <p className="mt-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                    Lost your encryption key? Enter your corporate identity to reset.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">
                      Registered Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                        placeholder="identity@enterprise.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-50 text-white hover:text-blue-600 py-5 rounded-2xl font-[1000] text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <RefreshCw className="animate-spin h-4 w-4" />
                      ) : (
                        <>Transmit Reset Link <Send size={14} /></>
                      )}
                    </span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-20 h-20 bg-blue-500/10 text-blue-500 rounded-[2rem] border border-blue-500/20 flex items-center justify-center shadow-2xl">
                    <CheckCircle2 size={40} className="animate-bounce" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-[1000] text-white uppercase italic tracking-tighter mb-4">Transmission Sent</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose mb-10">
                  A recovery uplink has been routed to:<br />
                  <span className="text-blue-400 font-black">{emailValue}</span>
                </p>
                
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-white/20 pb-1"
                >
                  No Signal? Retransmit Protocol
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}