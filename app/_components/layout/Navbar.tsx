"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import OSBLogo from "@/app/_components/shared/OSBLogo";
import SmoothScrollLink from "@/app/_components/shared/SmoothScrollLink";

const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "seni", label: "Seni & Budaya" },
  { id: "olahraga", label: "Olahraga" },
  { id: "daftar", label: "Kontak" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl py-3 shadow-[0_1px_20px_rgba(16,185,129,0.06)]"
          : "bg-white/60 backdrop-blur-sm py-5"
      }`}
      style={{
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Title - Ultra Neat Alignment */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex-shrink-0 scale-90 sm:scale-100 origin-left">
              <OSBLogo />
            </div>
            <div className="flex flex-col justify-center border-l border-gray-100 pl-2 sm:pl-3">
              <span className="text-lg sm:text-xl font-black tracking-tighter text-gray-900 leading-none mb-0.5 whitespace-nowrap">
                OSB
              </span>
              <span className="text-[8px] sm:text-[10px] font-extrabold text-ipnu-600 tracking-wider uppercase leading-none whitespace-nowrap">
                IPNU IPPNU Magetan
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links - Responsive Spacing */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <SmoothScrollLink
                key={link.id}
                targetId={link.id}
                className="relative px-3 py-2 text-sm font-bold text-gray-500 hover:text-ipnu-600 transition-colors group whitespace-nowrap"
              >
                {link.label}
                <div className="absolute bottom-1 left-3 right-3 h-0.5 bg-ipnu-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </SmoothScrollLink>
            ))}
          </div>

          {/* Right: Button & Mobile Toggle */}
          <div className="flex-[0_0_auto] md:flex-1 flex justify-end items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <SmoothScrollLink
                targetId="daftar"
                className="btn-primary py-2 px-5 sm:px-6 text-xs sm:text-sm font-bold shadow-lg shadow-ipnu-500/20 whitespace-nowrap"
              >
                <span>Daftar Sekarang</span>
              </SmoothScrollLink>
            </div>

            {/* Mobile Toggle - MEGA HIT AREA FIX */}
            <div className="md:hidden">
              <button
                id="nav-menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                onPointerDown={() => setMenuOpen(!menuOpen)} // FALLBACK FOR iOS SAFARI
                className="group p-3 -mr-2 text-ipnu-700 active:bg-ipnu-50 rounded-full transition-all cursor-pointer relative z-[110] outline-none border-none bg-transparent"
                style={{ 
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                  pointerEvents: "auto"
                }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Gaya 'Nyatu') - Tanpa Motion agar stabil di iOS */}
      {menuOpen && (
        <div
          className={`md:hidden overflow-hidden ${
            scrolled ? "bg-white/95 backdrop-blur-xl" : "bg-white"
          }`}
          style={{
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <div className="px-6 py-8 space-y-6 text-center border-t border-gray-50/50">
            {NAV_LINKS.map((link) => (
              <div key={link.id}>
                <SmoothScrollLink
                  targetId={link.id}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-xl font-bold text-gray-800 hover:text-ipnu-600 transition-colors cursor-pointer"
                >
                  {link.label}
                </SmoothScrollLink>
              </div>
            ))}
            <div className="pt-4">
              <SmoothScrollLink
                targetId="daftar"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center py-4 text-lg font-bold shadow-xl shadow-ipnu-500/15 cursor-pointer"
              >
                <span>Daftar Sekarang</span>
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
