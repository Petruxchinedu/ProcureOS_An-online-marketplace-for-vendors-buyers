"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediately move the user to the login screen
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      {/* Subtle loader while the redirect happens */}
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}