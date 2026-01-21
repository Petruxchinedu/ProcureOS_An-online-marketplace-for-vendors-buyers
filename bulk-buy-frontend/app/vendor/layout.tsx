// app/vendor/layout.tsx
import Link from "next/link";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="font-black text-xl tracking-tighter italic">BULK<span className="text-blue-600">BUY</span></div>
        
        <div className="flex gap-8">
          <Link href="/vendor/rfq" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Lead Inbox</Link>
          <Link href="/vendor/inventory" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">My Inventory</Link>
        </div>

        <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-700">V</div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}