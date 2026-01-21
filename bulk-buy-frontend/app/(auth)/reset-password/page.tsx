"use client";

import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/auth";
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const resetSchema = z.object({
  password: z.string().min(6, "Security key must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Security keys do not match",
  path: ["confirmPassword"],
});

type ResetFormData = z.infer<typeof resetSchema>;

function ResetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data: ResetFormData) => {
    if (!token) {
      toast.error("Security Token Missing");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ token, password: data.password });
      toast.success("Security Key Re-established.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Protocol Override Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        <div className="bg-[#0F172A]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20 mb-6 transform -rotate-3">
              <KeyRound size={32} />
            </div>
            <h1 className="text-2xl font-[1000] text-white uppercase italic tracking-tighter">Override Access</h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">Establish new security credentials</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verify Key</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-[9px] font-bold uppercase mt-1 ml-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                "Update Credentials"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}