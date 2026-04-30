"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import OSBLogo from "@/components/shared/osb-logo";
import SmoothScrollLink from "@/components/shared/smooth-scroll-link";
import Link from "next/link";

const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "seni", label: "Seni & Budaya" },
  { id: "olahraga", label: "Olahraga" },
  { id: "daftar", label: "Kontak" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gunakan useCallback agar referensi fungsi stabil
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav
      id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // Gunakan backgroundColor solid + opacity — BUKAN backdrop-filter
        // agar tidak membuat stacking context yang memblokir klik di iOS
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.97)"
          : "rgba(255,255,255,0.85)",
        borderBottom: scrolled ? "1px solid rgba(16,185,129,0.08)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(16,185,129,0.07)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        WebkitTransform: "translateZ(0)", // Paksa GPU layer di iOS
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* ===== Left: Logo ===== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <OSBLogo />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#111827",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                OSB
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#059669",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  marginTop: "3px",
                  whiteSpace: "nowrap",
                }}
              >
                IPNU IPPNU Magetan
              </span>
            </div>
          </div>

          {/* ===== Center: Desktop Nav ===== */}
          <div
            className="hidden lg:flex"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
            }}
          >
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

          {/* ===== Right: CTA + Hamburger ===== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            {/* Tombol Desktop */}
            <div className="hidden md:block">
              <Link
                href="/pendaftaran"
                className="btn-primary py-2.5 px-6 text-sm font-bold whitespace-nowrap"
              >
                Daftar Sekarang
              </Link>
            </div>

            {/* ===== Hamburger: iOS-safe Button ===== */}
            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden"
              onClick={toggleMenu}
              style={{
                // JANGAN tambahkan display di sini — biarkan Tailwind lg:hidden yang mengontrol
                alignItems: "center",
                justifyContent: "center",
                width: "44px", // minimum Apple tap target
                height: "44px", // minimum Apple tap target
                padding: "8px",
                border: "none",
                borderRadius: "10px",
                background: "transparent",
                color: "#047857",
                cursor: "pointer",
                position: "relative",
                zIndex: 200, // di atas segalanya
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                pointerEvents: "auto",
                userSelect: "none",
              }}
            >
              {menuOpen ? (
                <X size={26} strokeWidth={2.5} />
              ) : (
                <Menu size={26} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu Dropdown ===== */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid #ecfdf5",
          }}
        >
          <div
            style={{
              padding: "24px 24px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <SmoothScrollLink
                key={link.id}
                targetId={link.id}
                onClick={closeMenu}
                className="block py-3 text-center text-lg font-bold text-gray-800 hover:text-ipnu-600 transition-colors rounded-xl hover:bg-ipnu-50"
              >
                {link.label}
              </SmoothScrollLink>
            ))}
            <div style={{ marginTop: "8px" }}>
              <SmoothScrollLink
                targetId="daftar"
                onClick={closeMenu}
                className="btn-primary w-full justify-center py-4 text-base font-bold"
              >
                Daftar Sekarang
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
