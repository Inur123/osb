import Link from "next/link";
import { MoveLeft, Ghost } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";

export default function NotFound() {
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
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          {/* Ilustrasi Angka 404 */}
          <div className="relative">
            <h1 className="text-[120px] font-black text-gray-100 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 rotate-6 hover:rotate-0 transition-transform duration-500">
                <Ghost size={64} className="text-ipnu-600 animate-bounce" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Halaman Menghilang!
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Waduh, sepertinya halaman yang kamu cari sudah pindah ke dimensi lain atau tidak pernah ada.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95"
            >
              Kembali ke Beranda
            </Link>
          </div>

          {/* Footer Branding */}
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-12">
            &copy; {new Date().getFullYear()} OSB Magetan &bull; IPNU IPPNU
          </p>
        </div>
      </main>
    </div>
  );
}
