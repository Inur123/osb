import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SITE } from "@/app/lib/constants";

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
    "IPNU",
    "IPPNU",
    "Magetan",
    "Olahraga",
    "Seni",
    "Budaya",
    "Minat Bakat",
    "Pemuda",
    "Nahdlatul Ulama",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} h-full antialiased`}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-white text-ipnu-950">
        {children}
      </body>
    </html>
  );
}
