"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, LogIn, Zap, ShieldCheck, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid corporate email"),
  password: z.string().min(1, "Access key is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      const token = res.data.token || res.data.accessToken; 
      const user = res.data.user;

      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);
      document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
      
      await refreshUser(token);      
      toast.success("Identity Verified. Welcome.");

      if (user.role === "VENDOR") {
        router.push("/vendor/rfq"); 
      } else if (user.role === "ADMIN") {
        router.push("/admin");
      } else if (user.role === "BUYER") {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false); 
      if (err.response?.status === 401) {
        setError("password", {
          type: "manual",
          message: "Wrong email or password",
        });
        toast.error("Invalid credentials");
      } else if (err.response?.status === 403) {
        toast.error("Please verify your email first");
      } else {
        toast.error(err.response?.data?.message || "Authentication Failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4">
      
      {/* AMBIENT BACKGROUND */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full z-10"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 mb-6">
            <LogIn size={28} />
          </div>
          <h1 className="text-4xl font-[1000] tracking-tighter text-white uppercase italic leading-none">
            Access <span className="text-blue-500">Terminal</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Authenticate your credentials</p>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-[#0F172A]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                  placeholder="access@domain.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                  placeholder="••••••••••••"
                />
              </div>
              {errors.password && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group bg-white text-black py-5 rounded-[1.8rem] font-[1000] text-xs uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Authorize Entry"}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              New to Platform? <Link href="/register" className="text-blue-500 hover:text-white transition-colors ml-2">Register Entity</Link>
            </p>
          </div>
        </div>

        {/* TRUST FOOTER */}
        <div className="mt-8 flex justify-center gap-8 text-slate-600">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500/50" />
              <span className="text-[8px] font-black uppercase tracking-widest">256-bit Encrypted</span>
           </div>
           <div className="flex items-center gap-2">
              <Zap size={14} className="text-blue-500/50" />
              <span className="text-[8px] font-black uppercase tracking-widest">Real-Time Auth</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}