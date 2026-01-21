"use client";
import { Toaster } from 'sonner';
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >

        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow">{children}</main>
            </div>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#333",
                  color: "#fff",
                  borderRadius: "8px",
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
        <Toaster theme="dark" closeButton richColors />
      </body>
    </html>
  );
}
