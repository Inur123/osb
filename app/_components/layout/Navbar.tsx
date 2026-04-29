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
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start items-center gap-3">
            <div>
              <OSBLogo />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
                OSB
              </span>
              <span className="text-[10px] font-bold text-ipnu-600 tracking-[0.15em] uppercase mt-0.5">
                IPNU IPPNU Magetan
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-2">
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
          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="hidden md:block">
              <SmoothScrollLink
                targetId="daftar"
                className="btn-primary py-2.5 px-6 text-sm font-bold shadow-lg shadow-ipnu-500/20 whitespace-nowrap"
              >
                <span>Daftar Sekarang</span>
              </SmoothScrollLink>
            </div>

            {/* Mobile Toggle */}
            <button
              id="nav-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-ipnu-700 hover:bg-ipnu-50 rounded-lg transition-colors cursor-pointer relative z-[101]"
              style={{ 
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent" 
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
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
