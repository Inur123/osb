"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS } from "@/app/lib/constants";
import SmoothScrollLink from "@/app/_components/shared/SmoothScrollLink";
import OSBLogo from "@/app/_components/shared/OSBLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl py-3 shadow-[0_1px_20px_rgba(16,185,129,0.06)]"
          : "bg-white/60 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <SmoothScrollLink
            targetId="beranda"
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <OSBLogo className="w-10 h-10 shadow-lg shadow-ipnu-500/20 rounded-xl" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight text-gray-900">
                OSB
              </span>
              <span className="text-[10px] text-ipnu-500 tracking-widest uppercase font-semibold">
                IPNU IPPNU Magetan
              </span>
            </div>
          </SmoothScrollLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <SmoothScrollLink
                key={link.id}
                targetId={link.id}
                className="relative px-4 py-2 text-sm font-medium text-gray-500 hover:text-ipnu-600 transition-colors rounded-lg hover:bg-ipnu-50 group"
              >
                {link.label}
                <motion.div className="absolute bottom-1 left-4 right-4 h-0.5 bg-ipnu-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </SmoothScrollLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SmoothScrollLink
                targetId="daftar"
                className="btn-primary text-sm"
              >
                <span>Daftar Sekarang</span>
              </SmoothScrollLink>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ipnu-700 hover:bg-ipnu-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Moved outside constraints */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[9999] md:hidden flex flex-col"
          >
            {/* Mobile Header Inside Overlay */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-50 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <OSBLogo className="w-10 h-10 shadow-lg shadow-ipnu-500/10 rounded-xl" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-lg leading-none text-gray-900">
                    OSB
                  </span>
                  <span className="text-[10px] text-ipnu-500 tracking-widest uppercase font-semibold">
                    IPNU IPPNU Magetan
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-ipnu-700 hover:bg-ipnu-50 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto px-4 py-12 flex flex-col items-center justify-center space-y-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="w-full"
                >
                  <SmoothScrollLink
                    targetId={link.id}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-3xl font-bold text-gray-800 hover:text-ipnu-600 transition-colors text-center"
                  >
                    {link.label}
                  </SmoothScrollLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.2 }}
                className="pt-10 w-full max-w-sm"
              >
                <SmoothScrollLink
                  targetId="daftar"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full justify-center py-5 text-xl font-bold shadow-2xl shadow-ipnu-500/30"
                >
                  <span>Daftar Sekarang</span>
                </SmoothScrollLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
