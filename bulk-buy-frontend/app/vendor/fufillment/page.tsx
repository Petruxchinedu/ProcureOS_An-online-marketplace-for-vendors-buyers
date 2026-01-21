"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Package, Truck, CheckCircle2, AlertTriangle, 
  ExternalLink, Search, Filter, MoreVertical,
  Clock, DollarSign, Box
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function VendorFulfillmentDashboard() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["vendor-fulfillment"],
    queryFn: async () => {
      const res = await api.get("/rfq/vendor"); 
      // Filter for orders that are PAID or SHIPPED
      return res.data.filter((r: any) => ["PAID", "SHIPPED", "COMPLETED"].includes(r.status));
    }
  });

  const updateShippingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      return await api.patch(`/rfq/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-fulfillment"] });
      toast.success("Shipment Status Updated");
    }
  });

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse">LOADING FULFILLMENT QUEUE...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter italic uppercase">Fulfillment Command</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage paid contracts and outbound logistics.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escrow Balance</p>
                <p className="text-xl font-black text-emerald-600">$42,800.00</p>
            </div>
          </div>
        </div>

        {/* SHIPMENT TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: ACTIVE SHIPMENTS */}
          <div className="lg:col-span-8 space-y-6">
            {orders?.map((order: any) => (
              <div key={order._id} className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                      <Box size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-lg leading-tight">{order.productId?.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Order #ORD-{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    order.status === 'PAID' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {order.status === 'PAID' ? 'Ready to Ship' : 'In Transit'}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-50">
                   <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                     <p className="text-sm font-bold text-slate-700 truncate">{order.buyerId?.name}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Quantity</p>
                     <p className="text-sm font-bold text-slate-700">{order.quantity.toLocaleString()} Units</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Release Value</p>
                     <p className="text-sm font-black text-emerald-600">${(order.quantity * (order.vendorCounterPrice || order.targetUnitPrice)).toLocaleString()}</p>
                   </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                    <Clock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Ship within 48h</span>
                  </div>
                  
                  <div className="flex gap-3">
                    {order.status === 'PAID' && (
                      <button 
                        onClick={() => updateShippingStatus.mutate({ id: order._id, status: "SHIPPED" })}
                        className="bg-blue-600 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                      >
                        <Truck size={14} /> Generate Waybill & Ship
                      </button>
                    )}
                    <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl border border-slate-100">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: LOGISTICS INSIGHTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
              <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Logistics Health</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400 font-medium">Avg. Shipping Time</span>
                  <span className="font-black">1.2 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400 font-medium">Pending Pickups</span>
                  <span className="font-black text-blue-400">{orders?.filter((o:any) => o.status === 'PAID').length}</span>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Carrier Integration Settings
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-amber-500" size={20} />
                <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Escrow Reminder</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Funds are released to your main wallet <span className="text-slate-900 font-bold">24 hours after the buyer confirms receipt</span>. Ensure tracking numbers are uploaded promptly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}