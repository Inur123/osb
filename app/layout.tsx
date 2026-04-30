import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SITE } from "@/app/lib/constants";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// ===== LOCK 1: Browser Lock =====
export const viewport: Viewport = {
  colorScheme: "only light",  // Browser tidak boleh menawarkan dark mode
  themeColor: "#ffffff",       // Status bar HP dipaksa putih
};

export const metadata: Metadata = {
  title: "OSB - Olahraga, Seni & Budaya | PC IPNU IPPNU Magetan",
  description:
    "Pendataan Minat dan Bakat bidang Olahraga, Seni & Budaya PC IPNU IPPNU Kabupaten Magetan. Bergabunglah dan kembangkan potensimu bersama kami!",
  keywords: [
    "IPNU", "IPPNU", "Magetan", "Olahraga",
    "Seni", "Budaya", "Minat Bakat", "Pemuda", "Nahdlatul Ulama",
  ],
  authors: [{ name: "PC IPNU IPPNU Magetan" }],
  openGraph: {
    title: "OSB - Olahraga, Seni & Budaya | PC IPNU IPPNU Magetan",
    description:
      "Pendataan Minat dan Bakat bidang Olahraga, Seni & Budaya PC IPNU IPPNU Kabupaten Magetan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} h-full antialiased light`}
      data-theme="light"
      data-darkreader-mode="disabled"
      style={{
        colorScheme: "only light",
        // @ts-ignore — forcedColorAdjust mencegah OPPO/Xiaomi ubah warna otomatis
        forcedColorAdjust: "none",
      }}
    >
      <body
        className="min-h-full flex flex-col bg-white text-ipnu-950"
        style={{ backgroundColor: "#ffffff" }}
      >
        {children}
      </body>
    </html>
  );
}
