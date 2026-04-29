"use client";

import Image from "next/image";
import { Music, Camera, Palette, Mic2 } from "lucide-react";

const CATEGORIES = [
  {
    name: "Seni Musik",
    icon: Music,
    desc: "Vokal, Hadrah, & Musik Modern",
    gradient: "from-amber-50 to-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-100",
  },
  {
    name: "Seni Visual",
    icon: Camera,
    desc: "Fotografi & Desain Grafis",
    gradient: "from-ipnu-50 to-ipnu-100",
    iconColor: "text-ipnu-600",
    border: "border-ipnu-100",
  },
  {
    name: "Seni Lukis",
    icon: Palette,
    desc: "Lukis & Kaligrafi",
    gradient: "from-rose-50 to-rose-100",
    iconColor: "text-rose-600",
    border: "border-rose-100",
  },
  {
    name: "Seni Pertunjukan",
    icon: Mic2,
    desc: "Puisi & Public Speaking",
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
] as const;

export default function SeniBudayaSection() {
  return (
    <section id="seni" className="relative py-10 sm:py-14 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-4 bg-gradient-to-br from-ipnu-100/50 to-amber-100/30 rounded-3xl blur-2xl" />
            <div className="relative">
              <Image
                src="/images/seni-budaya.png"
                alt="Seni Budaya"
                width={600}
                height={600}
                className="w-full h-auto mix-blend-multiply contrast-[1.1] brightness-[1.05]"
                unoptimized
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-amber-600 border border-amber-200 bg-amber-50 mb-4">
                Bidang Seni & Budaya
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ekspresikan <span className="gradient-text" style={{ color: "#059669" }}>Jiwa Senimu</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mx-auto lg:mx-0 max-w-lg">
                Salurkan bakat seni dan budayamu melalui berbagai cabang yang
                tersedia. Temukan passionmu and kembangkan bersama IPNU IPPNU
                Magetan.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className={`glass-card rounded-xl p-5 group cursor-pointer bg-white ${cat.border} flex flex-col items-center text-center sm:items-start sm:text-left transition-all duration-300 hover:translate-x-1`}
                  >
                    <div
                      className={`icon-box bg-gradient-to-br ${cat.gradient} mb-3 transition-transform`}
                      style={{ backgroundColor: cat.iconColor.includes("amber") ? "#fffbeb" : cat.iconColor.includes("ipnu") ? "#ecfdf5" : cat.iconColor.includes("rose") ? "#fff1f2" : "#eff6ff" }}
                    >
                      <Icon size={20} className={cat.iconColor} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{cat.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
