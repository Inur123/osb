"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home, AlertCircle } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Catat error ke console untuk debugging admin
    console.error("System Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <OSBLogo />
            <div>
              <p className="text-sm font-black text-gray-900 leading-none">OSB</p>
              <p className="text-[10px] font-bold text-ipnu-600 uppercase">IPNU IPPNU Magetan</p>
            </div>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pt-20">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Error Icon */}
          <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-50" />
            <AlertCircle size={48} className="relative z-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Oops! Ada Masalah.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Sistem kami sedang mengalami kendala teknis sejenak. Jangan panik, tim kami akan segera memperbaikinya.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center bg-ipnu-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-ipnu-700 transition-all shadow-lg shadow-ipnu-100 active:scale-95"
            >
              Coba Lagi
            </button>
            <Link 
              href="/" 
              className="flex items-center justify-center bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
            >
              Kembali ke Beranda
            </Link>
          </div>

          {/* Error Code/Digest (Subtle) */}
          {error.digest && (
            <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
              Error ID: {error.digest}
            </p>
          )}

          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-8">
            &copy; {new Date().getFullYear()} OSB Magetan &bull; IPNU IPPNU
          </p>
        </div>
      </main>
    </div>
  );
}
