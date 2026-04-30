"use client";

import Link from "next/link";
import { Check, ArrowLeft, User, MapPin, Building, Sparkles } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const nama = searchParams.get("nama");
  const organisasi = searchParams.get("organisasi");
  const alamat = searchParams.get("alamat");
  const asal_pac = searchParams.get("asal_pac");
  const pilihan = searchParams.get("pilihan")?.split(",") || [];

  return (
    <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Success Icon */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 bg-ipnu-100 rounded-full animate-ping opacity-20" />
        <div className="relative w-20 h-20 bg-ipnu-100 rounded-full flex items-center justify-center text-ipnu-600">
          <Check size={40} strokeWidth={3} />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Pendaftaran Berhasil!
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Data kamu telah tersimpan dengan aman di sistem kami.
        </p>
      </div>

      {/* Detail Data Card (NEW) */}
      {nama && (
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 text-left shadow-xl shadow-gray-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <OSBLogo />
          </div>
          
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black text-white ${organisasi === "IPNU" ? "bg-ipnu-600" : "bg-pink-600"}`}>
              {organisasi}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registrasi Berhasil</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <User className="size-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Nama Lengkap</p>
                <p className="text-sm font-black text-gray-900 uppercase">{nama}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building className="size-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Asal PAC</p>
                <p className="text-sm font-black text-gray-900 uppercase">{asal_pac}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="size-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Alamat Lengkap</p>
                <p className="text-sm font-bold text-gray-700 capitalize">{alamat}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Sparkles className="size-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Minat & Bakat</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {pilihan.map((p) => (
                    <span key={p} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md capitalize">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Steps Card */}
      <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-left space-y-4">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center sm:text-left">Langkah Selanjutnya</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4 text-sm text-gray-600">
            <div className="size-6 rounded-full bg-ipnu-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
            <span>Tunggu informasi selanjutnya melalui grup WhatsApp kami.</span>
          </li>
          <li className="flex items-start gap-4 text-sm text-gray-600">
            <div className="size-6 rounded-full bg-ipnu-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
            <span>Siapkan diri kamu untuk rangkaian kegiatan OSB Magetan.</span>
          </li>
        </ul>
      </div>

      {/* Home Button */}
      <div className="pt-4">
        <Link 
          href="/" 
          className="flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 w-full"
        >
          Kembali ke Beranda
        </Link>
      </div>

      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4 pb-10">
        &copy; {new Date().getFullYear()} OSB Magetan &bull; IPNU IPPNU
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <OSBLogo />
            <div className="hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-none">OSB</p>
              <p className="text-[10px] font-bold text-ipnu-600 uppercase">IPNU IPPNU Magetan</p>
            </div>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <Suspense fallback={
          <div className="flex items-center gap-2">
            <div className="animate-spin size-4 border-2 border-ipnu-600 border-t-transparent rounded-full" />
            <span className="text-sm font-bold text-gray-500">Memuat data...</span>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
