"use client";

import Image from "next/image";
import { Brush, PenTool, Music, Swords } from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
  desc: string;
  gradient: string;
  iconColor: string;
  border: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Seni Lukis",
    icon: Brush,
    desc: "Ekspresikan kreativitas melalui goresan warna dan imajinasi.",
    gradient: "from-rose-50 to-rose-100",
    iconColor: "text-rose-500",
    border: "hover:border-rose-200",
  },
  {
    name: "Seni Kaligrafi",
    icon: PenTool,
    desc: "Keindahan aksara Arab yang menjadi karya seni bernilai tinggi.",
    gradient: "from-amber-50 to-amber-100",
    iconColor: "text-amber-500",
    border: "hover:border-amber-200",
  },
  {
    name: "Seni Tari",
    icon: Music,
    desc: "Lestarikan budaya Nusantara melalui gerakan tari tradisional.",
    gradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-500",
    border: "hover:border-purple-200",
  },
  {
    name: "Pencak Silat",
    icon: Swords,
    desc: "Seni bela diri warisan budaya Indonesia yang mengasah mental.",
    gradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
    border: "hover:border-emerald-200",
  },
];

export default function SeniBudayaSection() {
  return (
    <section
      id="seni-budaya"
      className="relative py-10 sm:py-14 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
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
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-amber-600 border border-amber-200 bg-amber-50 mb-4">
                Bidang Seni & Budaya
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ekspresikan <span className="gradient-text">Jiwa Senimu</span>
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Salurkan bakat seni dan budayamu melalui berbagai cabang yang
                tersedia. Temukan passionmu and kembangkan bersama IPNU IPPNU
                Magetan.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className={`glass-card rounded-xl p-5 group cursor-pointer bg-white ${cat.border}`}
                  >
                    <div
                      className={`icon-box bg-gradient-to-br ${cat.gradient} mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={20} className={cat.iconColor} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{cat.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
