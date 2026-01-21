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
import { Mail, Lock, LogIn, Zap, ShieldCheck, Globe } from "lucide-react";
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
      } else {
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
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        {/* LOGO AREA */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 mb-4 transform rotate-12">
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-[1000] tracking-tighter text-white uppercase italic">
            Procure<span className="text-blue-500">OS</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Enterprise Access Terminal</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-[#0F172A]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                  placeholder="name@enterprise.com"
                />
              </div>
              {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                <Link href="/forgot-password" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Lost Key?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-400 text-[10px] font-bold uppercase mt-1 ml-1">{errors.password.message}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Authenticating..." : "Establish Connection"} 
                {!isLoading && <LogIn size={16} />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              No Clearance? <Link href="/register" className="text-blue-500 hover:text-white transition-colors ml-2">Request Onboarding</Link>
            </p>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-8 flex justify-center gap-6 text-slate-600">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500/50" />
              <span className="text-[9px] font-bold uppercase tracking-widest">AES-256 Encrypted</span>
           </div>
           <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-500/50" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Global Node</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}