"use client";

import { Rocket, ClipboardEdit } from "lucide-react";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section id="daftar" className="relative py-10 sm:py-14 bg-white">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-10 sm:p-16 overflow-hidden bg-gradient-to-br from-ipnu-500 to-ipnu-600 shadow-2xl shadow-ipnu-500/25"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-ipnu-400/20 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gold-400/15 blur-2xl"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px shimmer-line" />

          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto"
            >
              <Rocket size={28} className="text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Siap Bergabung?</h2>
            <p className="text-ipnu-100 text-lg max-w-xl mx-auto leading-relaxed">
              Daftarkan minat dan bakatmu sekarang! Bersama IPNU IPPNU Magetan, kita wujudkan generasi muda NU yang berprestasi.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ipnu-700 font-bold text-lg rounded-full shadow-lg shadow-black/10 transition-shadow hover:shadow-xl"
                id="cta-register"
              >
                <ClipboardEdit size={20} />
                Daftar Minat Bakat
              </motion.a>
            </div>
            <p className="text-xs text-ipnu-200 mt-4">* Form pendaftaran akan segera dibuka. Stay tuned!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
