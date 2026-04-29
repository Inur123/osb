"use client";

import { Target, Sparkles, Users, Award } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: Target,
    title: "Pendataan Minat Bakat",
    desc: "Mendata potensi minat dan bakat anggota IPNU IPPNU se-Kabupaten Magetan secara terstruktur.",
    gradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "Pengembangan Potensi",
    desc: "Wadah bagi kader muda NU untuk mengembangkan kemampuan di bidang olahraga, seni dan budaya.",
    gradient: "from-amber-50 to-amber-100",
    iconColor: "text-amber-500",
  },
  {
    icon: Users,
    title: "Membangun Jaringan",
    desc: "Menghubungkan kader potensial dari berbagai PAC untuk berkolaborasi dan berkompetisi.",
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-500",
  },
  {
    icon: Award,
    title: "Meraih Prestasi",
    desc: "Mencetak generasi muda NU berprestasi di tingkat kabupaten hingga nasional.",
    gradient: "from-violet-50 to-violet-100",
    iconColor: "text-violet-500",
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative py-10 sm:py-14 section-soft overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-ipnu-600 border border-ipnu-200 bg-ipnu-50 mb-4 cursor-default"
          >
            Tentang Program
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Mengapa <span className="gradient-text-green">OSB IPNU IPPNU?</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Program Olahraga, Seni & Budaya (OSB) merupakan program unggulan PC
            IPNU IPPNU Kabupaten Magetan untuk mendata dan mengembangkan minat
            bakat kader di seluruh PAC.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass-card rounded-2xl p-6 text-center group bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ipnu-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div
                  className={`icon-box bg-gradient-to-br ${f.gradient} mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <Icon size={22} className={f.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
