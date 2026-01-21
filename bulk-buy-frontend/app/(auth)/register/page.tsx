"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, Mail, Lock, UserPlus, 
  Zap, ShieldCheck, Globe, Briefcase, ChevronRight 
} from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid corporate email"),
  password: z.string().min(6, "Security key must be at least 6 characters"),
  organizationName: z.string().min(2, "Legal entity name is required"),
  role: z.enum(["BUYER", "VENDOR"]),
});

type RegisterFormData = z.infer<typeof schema>;

export default function EliteRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { role: "BUYER" }
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success("Identity Created. Please verify your email.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration sequence failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-20">
      
      {/* AMBIENT BACKGROUND */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full z-10"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 mb-6 transform -rotate-6">
            <UserPlus size={28} />
          </div>
          <h1 className="text-4xl font-[1000] tracking-tighter text-white uppercase italic leading-none">
            Onboard <span className="text-blue-500">Protocol</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-3">Register your enterprise on ProcureOS</p>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-[#0F172A]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* ROLE TOGGLE - THE CORE SELECTION */}
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-3xl border border-white/5">
              <button
                type="button"
                onClick={() => setValue("role", "BUYER")}
                className={`flex items-center justify-center gap-2 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedRole === "BUYER" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-white"
                }`}
              >
                <Briefcase size={14} /> Global Buyer
              </button>
              <button
                type="button"
                onClick={() => setValue("role", "VENDOR")}
                className={`flex items-center justify-center gap-2 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedRole === "VENDOR" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:text-white"
                }`}
              >
                <Zap size={14} /> Enterprise Vendor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ORG NAME */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Organization</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    {...register("organizationName")}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Acme Global Inc."
                  />
                </div>
                {errors.organizationName && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.organizationName.message}</p>}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                    placeholder="hq@acme.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.email.message}</p>}
              </div>

              {/* PASSWORD - FULL WIDTH */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Access Key</label>
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group bg-white text-black py-5 rounded-[1.8rem] font-[1000] text-xs uppercase tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Processing Data..." : "Initialize Onboarding"}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Already Authorized? <Link href="/login" className="text-blue-500 hover:text-white transition-colors ml-2">Authenticate Here</Link>
            </p>
          </div>
        </div>

        {/* TRUST FOOTER */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-slate-600">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500/50" />
              <span className="text-[8px] font-black uppercase tracking-widest">Enterprise Verified</span>
           </div>
           <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-500/50" />
              <span className="text-[8px] font-black uppercase tracking-widest">25+ Trade Corridors</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}