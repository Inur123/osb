"use client";

import Image from "next/image";
import { Rocket, ArrowRight, Palette, Trophy } from "lucide-react";
import { motion } from "motion/react";
import SmoothScrollLink from "@/app/_components/shared/SmoothScrollLink";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[auto] lg:min-h-screen flex items-center justify-center overflow-hidden hero-bg"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Decorative blobs removed as requested */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-36 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ipnu-50 border border-ipnu-200 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-ipnu-500 animate-pulse" />
              <span className="text-sm font-semibold text-ipnu-700">
                Pendaftaran Dibuka
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Olahraga,</span>
              <br />
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="gradient-text"
              >
                Seni & Budaya
              </motion.span>
              <br />
              <span className="text-ipnu-600 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                PC IPNU IPPNU Magetan
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Wadah pengembangan minat dan bakat generasi muda NU Kabupaten
              Magetan di bidang olahraga, seni dan budaya. Tunjukkan potensimu,
              raih prestasimu!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:max-w-none">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <SmoothScrollLink
                  targetId="daftar"
                  className="btn-primary text-base w-full sm:w-auto justify-center"
                >
                  <Rocket size={18} />
                  <span>Daftar Minat Bakat</span>
                </SmoothScrollLink>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <SmoothScrollLink
                  targetId="tentang"
                  className="btn-secondary text-base w-full sm:w-auto justify-center"
                >
                  Pelajari Selengkapnya
                  <ArrowRight size={16} />
                </SmoothScrollLink>
              </motion.div>
            </div>

            <div className="flex justify-center lg:justify-start gap-8 pt-4">
              {[
                { number: "8+", label: "Cabang Minat" },
                { number: "20+", label: "PAC Se-Magetan" },
                { number: "100+", label: "Peserta" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text-green">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-medium whitespace-nowrap">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-4 bg-gradient-to-br from-ipnu-200/40 to-gold-300/20 rounded-3xl blur-2xl" />
              <div className="relative group">
                <Image
                  src="/images/hero-banner.png"
                  alt="Hero"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover mix-blend-multiply contrast-[1.1] brightness-[1.05]"
                  unoptimized
                  loading="eager"
                />
              </div>

              {/* Floating badges with Motion */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-ipnu-500/10 border border-ipnu-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                    <Palette size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Seni Budaya</div>
                    <div className="text-sm font-bold text-ipnu-700">
                      4 Cabang
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-3 -left-3 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-ipnu-500/10 border border-ipnu-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ipnu-50 to-ipnu-100 flex items-center justify-center">
                    <Trophy size={18} className="text-ipnu-600" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">Olahraga</div>
                    <div className="text-sm font-bold text-ipnu-700">
                      4+ Cabang
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
