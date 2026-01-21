"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { PackagePlus, Check, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Gets the ID from the URL
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerUnit: "",
    minimumOrderQuantity: "",
    category: "",
    imageUrl: ""
  });

  // 1. Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setFormData({
          name: p.name,
          description: p.description || "",
          pricePerUnit: p.pricePerUnit.toString(),
          minimumOrderQuantity: p.minimumOrderQuantity.toString(),
          category: p.category,
          imageUrl: p.images?.[0] || ""
        });
      } catch (err) {
        toast.error("Could not load product");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/products/${id}`, {
        ...formData,
        pricePerUnit: Number(formData.pricePerUnit),
        minimumOrderQuantity: Number(formData.minimumOrderQuantity),
        images: formData.imageUrl ? [formData.imageUrl] : []
      });
      toast.success("Product updated!");
      router.push("/vendor/inventory");
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/vendor/inventory" className="flex items-center text-slate-500 mb-8 hover:text-blue-600 transition-all font-bold">
          <ArrowLeft size={20} className="mr-2" /> Back to Inventory
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-3xl font-black flex items-center gap-3">Edit Product</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Product Name</label>
              <input required value={formData.name} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Unit Price ($)</label>
                <input type="number" required value={formData.pricePerUnit} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl" 
                  onChange={e => setFormData({...formData, pricePerUnit: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Min Order Qty</label>
                <input type="number" required value={formData.minimumOrderQuantity} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl" 
                  onChange={e => setFormData({...formData, minimumOrderQuantity: e.target.value})} />
              </div>
            </div>

            <button disabled={loading} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}