"use client";

import { useEffect, Suspense } from "react";
import { verifyEmail } from "@/lib/auth";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Globe } from "lucide-react";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      toast.error("No authentication token found");
      return;
    }

    // Artificial delay to make the user feel the "scanning" process
    const timer = setTimeout(() => {
      verifyEmail(token)
        .then(() => {
          toast.success("Identity Verified. Access Granted.");
          router.push("/login");
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Verification Sequence Failed");
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      
      {/* Moving Verification Bar */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 z-0"
      />

      <div className="z-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative inline-block mb-10"
        >
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
          <div className="relative w-24 h-24 bg-[#0F172A] border border-white/10 rounded-[2rem] flex items-center justify-center text-blue-500 shadow-2xl">
            <Cpu size={48} className="animate-pulse" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-[1000] text-white uppercase italic tracking-tighter mb-4">
          Verifying <span className="text-blue-500">Node</span> Identity
        </h2>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              />
            ))}
          </div>
          
          <div className="px-6 py-2 bg-white/5 border border-white/5 rounded-full">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Establishing Secure Handshake...</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-8 text-slate-700">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-black uppercase tracking-widest">Protocol Verified</span>
           </div>
           <div className="flex items-center gap-2">
              <Globe size={14} />
              <span className="text-[8px] font-black uppercase tracking-widest">Global Sync</span>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}