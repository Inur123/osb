"use client";

import Image from "next/image";
import { Trophy, Target, Award, Users } from "lucide-react";

const SPORTS = [
  {
    name: "Sepak Bola",
    icon: Target,
    desc: "Turnamen antar PAC IPNU IPPNU",
    gradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    name: "Bulutangkis",
    icon: Award,
    desc: "Tunggal & Ganda Putra Putri",
    gradient: "from-sky-50 to-sky-100",
    iconColor: "text-sky-600",
    border: "border-sky-100",
  },
  {
    name: "E-Sport",
    icon: Users,
    desc: "Mobile Legends & E-Football",
    gradient: "from-violet-50 to-violet-100",
    iconColor: "text-violet-600",
    border: "border-violet-100",
  },
  {
    name: "Tenis Meja",
    icon: Trophy,
    desc: "Kompetisi ketangkasan & fokus",
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
] as const;

export default function OlahragaSection() {
  return (
    <section
      id="olahraga"
      className="relative py-10 sm:py-14 overflow-hidden"
      style={{ backgroundColor: "#f9fdfb" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-ipnu-600 border border-ipnu-200 bg-ipnu-50 mb-4">Bidang Olahraga</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tunjukkan <span className="gradient-text-green" style={{ color: "#059669" }}>Sportivitasmu</span></h2>
              <p className="text-gray-500 leading-relaxed mx-auto lg:mx-0 max-w-lg">Bergabunglah dalam berbagai cabang olahraga dan buktikan kemampuanmu bersama kader IPNU IPPNU Magetan.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {SPORTS.map((sport) => {
                const Icon = sport.icon;
                return (
                  <div
                    key={sport.name}
                    className={`glass-card rounded-xl p-5 group cursor-pointer flex flex-col items-center text-center sm:items-start sm:text-left transition-all duration-300 hover:scale-[1.02]`}
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#d1fae5",
                    }}
                  >
                    <div
                      className={`icon-box mb-3 group-hover:rotate-6 transition-transform`}
                      style={{ backgroundColor: sport.iconColor.includes("emerald") ? "#ecfdf5" : sport.iconColor.includes("sky") ? "#f0f9ff" : sport.iconColor.includes("violet") ? "#f5f3ff" : "#fff7ed" }}
                    >
                      <Icon size={20} className={sport.iconColor} />
                    </div>
                    <h4 className="font-bold mb-1" style={{ color: "#1f2937" }}>{sport.name}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{sport.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-4 bg-gradient-to-br from-ipnu-100/50 to-sky-100/30 rounded-3xl blur-2xl" />
            <div className="relative">
              <Image
                src="/images/olahraga.png"
                alt="Olahraga"
                width={600}
                height={600}
                className="w-full h-auto mix-blend-multiply contrast-[1.1] brightness-[1.05]"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
