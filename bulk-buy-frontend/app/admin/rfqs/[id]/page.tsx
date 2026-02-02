"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  User,
  Building2,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  Loader2,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RFQDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-rfq-detail", id],
    queryFn: async () => {
      const res = await api.get(`/admin/rfqs/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  const rfq = data?.rfq;
  const order = data?.order;

  if (!rfq) {
    return (
      <div className="text-center py-20">
        <p className="text-white font-bold text-xl">RFQ not found</p>
      </div>
    );
  }

  const dealValue = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-white mb-1">RFQ Details</h1>
          <p className="text-slate-400 font-semibold font-mono">
            ID: {rfq._id}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - RFQ Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Package className="text-blue-400" size={20} />
              Product Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Product Name</p>
                <p className="text-white font-bold text-lg">{rfq.productId?.name || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Category</p>
                  <p className="text-white font-semibold">{rfq.productId?.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Base Price</p>
                  <p className="text-white font-semibold">${rfq.productId?.pricePerUnit || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buyer */}
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <User className="text-purple-400" size={20} />
                Buyer
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Email</p>
                  <p className="text-white font-semibold">{rfq.buyerId?.email || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Vendor */}
            <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Building2 className="text-blue-400" size={20} />
                Vendor
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Email</p>
                  <p className="text-white font-semibold">{rfq.vendorId?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <MessageSquare className="text-blue-400" size={20} />
              Buyer Message
            </h3>
            <p className="text-slate-300 font-medium italic border-l-4 border-blue-500 pl-4 py-2">
              "{rfq.message || "No message provided"}"
            </p>
          </div>

          {/* Order Info (if exists) */}
          {order && (
            <div className="rounded-2xl bg-emerald-900/20 backdrop-blur border border-emerald-500/20 p-6">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <ShoppingCart className="text-emerald-400" size={20} />
                Associated Order
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Order ID</p>
                  <p className="text-white font-mono font-semibold">{order._id.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Status</p>
                  <p className="text-emerald-400 font-bold">{order.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
            <h3 className="text-sm font-black text-slate-400 uppercase mb-4">Status</h3>
            <span className={cn(
              "inline-block px-4 py-2 rounded-xl text-sm font-black uppercase",
              rfq.status === "PENDING" && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
              rfq.status === "NEGOTIATING" && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
              rfq.status === "ACCEPTED" && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
              rfq.status === "REJECTED" && "bg-red-500/10 text-red-500 border border-red-500/20"
            )}>
              {rfq.status}
            </span>
          </div>

          {/* Deal Value */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur border border-blue-500/20 p-6">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <DollarSign size={20} />
              <h3 className="text-sm font-black uppercase">Deal Value</h3>
            </div>
            <p className="text-4xl font-black text-white">${dealValue.toLocaleString()}</p>
            <p className="text-sm text-slate-400 font-semibold mt-2">
              {rfq.quantity} units @ ${rfq.targetUnitPrice}/unit
            </p>
            {rfq.vendorCounterPrice && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Vendor Counter</p>
                <p className="text-emerald-400 font-black text-xl">
                  ${rfq.vendorCounterPrice}/unit
                </p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="rounded-2xl bg-slate-900/50 backdrop-blur border border-slate-800 p-6">
            <h3 className="text-sm font-black text-slate-400 uppercase mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-blue-400" />
                <div>
                  <p className="text-xs text-slate-500 font-bold">Created</p>
                  <p className="text-white font-semibold text-sm">
                    {new Date(rfq.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-purple-400" />
                <div>
                  <p className="text-xs text-slate-500 font-bold">Last Updated</p>
                  <p className="text-white font-semibold text-sm">
                    {new Date(rfq.updatedAt).toLocaleString()}
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