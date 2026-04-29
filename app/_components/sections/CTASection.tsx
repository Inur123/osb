"use client";

import { Rocket, ClipboardEdit } from "lucide-react";

export default function CTASection() {
  return (
    <section id="daftar" className="relative py-8 sm:py-12 bg-white">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-ipnu-600 bg-gradient-to-br from-ipnu-500 to-ipnu-600 shadow-2xl shadow-ipnu-500/25"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ipnu-400/20 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="flex-1 drop-shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Rocket className="text-white w-4 h-4" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Join Us</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                Siap Menunjukkan <span className="text-amber-300">Potensi Terbaikmu?</span>
              </h2>
              
              <p className="text-ipnu-50 text-base max-w-xl leading-relaxed">
                Daftar sekarang dan jadilah bagian dari generasi berprestasi bersama ribuan kader IPNU IPPNU Magetan lainnya.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 min-w-[240px]">
              <a 
                href="#"
                className="group relative inline-flex items-center gap-3 bg-white text-ipnu-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 shadow-xl"
              >
                <ClipboardEdit size={22} />
                <span>Isi Form Pendaftaran</span>
              </a>
              <p className="text-[10px] text-ipnu-200">* Form pendaftaran segera dibuka.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
