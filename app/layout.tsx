import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

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

// ====== LOCK 1: Browser Lock — beritahu browser sejak awal ======
export const viewport: Viewport = {
  colorScheme: "only light",  // Browser TIDAK menawarkan dark mode
  themeColor: "#ffffff",      // Bar browser di HP dipaksa putih
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} light h-full antialiased`}
      data-theme="light"
      data-darkreader-mode="disabled"      // Matikan paksa ekstensi Dark Reader
      style={{
        colorScheme: "only light",          // Standar browser
        forcedColorAdjust: "none" as never, // Cegah HP (Oppo/Xiaomi) merubah warna
      }}
    >
      <body
        className="min-h-full flex flex-col bg-white"
        style={{ backgroundColor: "#ffffff", color: "#1a2e24" }}
      >
        {children}
      </body>
    </html>
  );
}
