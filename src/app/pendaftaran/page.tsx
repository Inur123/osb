import { prisma } from "@/lib/prisma";
import PendaftaranClient from "./pendaftaran-client";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";
import { getFormStatus } from "@/app/actions/settings-actions";
import { RealtimeStatusListener } from "@/components/shared/realtime-status-listener";

export default async function PendaftaranPage() {
  const [activePeriode, formSetting] = await Promise.all([
    prisma.periode.findFirst({ where: { isActive: true } }),
    getFormStatus()
  ]);

  if (!activePeriode || !formSetting.isFormActive) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Listener Realtime — agar halaman ini berubah saat Admin membuka pendaftaran */}
        <RealtimeStatusListener />

        {/* Navbar Simple */}
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

        <main className="flex-1 flex items-center justify-center p-4 pt-20">
          <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <Lock size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-gray-900">Pendaftaran Ditutup</h1>
              <p className="text-gray-500 leading-relaxed">
                Mohon maaf, saat ini tidak ada periode pendaftaran yang sedang aktif. 
                Silakan pantau terus media sosial kami untuk informasi selanjutnya.
              </p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all w-full"
            >
              <ArrowLeft size={18} /> Kembali ke Beranda
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return <PendaftaranClient />;
}
