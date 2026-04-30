import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
          {/* Success Icon */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-ipnu-100 rounded-full animate-ping opacity-20" />
            <div className="relative w-24 h-24 bg-ipnu-100 rounded-full flex items-center justify-center text-ipnu-600">
              <Check size={48} strokeWidth={3} />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Data kamu telah tersimpan. Selamat bergabung menjadi bagian dari 
              <span className="font-bold text-gray-900"> OSB Magetan!</span>
            </p>
          </div>

          {/* Info Card */}
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
              className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 w-full"
            >
              <ArrowLeft size={18} /> Kembali ke Beranda
            </Link>
          </div>

          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4">
            &copy; {new Date().getFullYear()} OSB Magetan &bull; IPNU IPPNU
          </p>
        </div>
      </main>
    </div>
  );
}
