"use client";

import Image from "next/image";
import { CircleDot, Feather, Circle, Medal } from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface Sport {
  name: string;
  icon: LucideIcon;
  desc: string;
  gradient: string;
  iconColor: string;
  border: string;
}

const SPORTS: Sport[] = [
  { name: "Futsal", icon: CircleDot, desc: "Permainan tim yang mengasah kerjasama dan strategi.", gradient: "from-emerald-50 to-emerald-100", iconColor: "text-emerald-600", border: "hover:border-emerald-200" },
  { name: "Bulutangkis", icon: Feather, desc: "Olahraga raket yang melatih kelincahan dan refleks.", gradient: "from-sky-50 to-sky-100", iconColor: "text-sky-500", border: "hover:border-sky-200" },
  { name: "Bola Voli", icon: Circle, desc: "Permainan tim yang membangun kekompakan.", gradient: "from-orange-50 to-orange-100", iconColor: "text-orange-500", border: "hover:border-orange-200" },
  { name: "Dan Lainnya", icon: Medal, desc: "Berbagai cabang olahraga lain yang bisa kamu eksplorasi.", gradient: "from-amber-50 to-amber-100", iconColor: "text-amber-500", border: "hover:border-amber-200" },
];

export default function OlahragaSection() {
  return (
    <section id="olahraga" className="relative py-10 sm:py-14 bg-gray-50/50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-ipnu-600 border border-ipnu-200 bg-ipnu-50 mb-4">Bidang Olahraga</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tunjukkan <span className="gradient-text-green">Sportivitasmu</span></h2>
              <p className="text-gray-500 leading-relaxed">Bergabunglah dalam berbagai cabang olahraga dan buktikan kemampuanmu bersama kader IPNU IPPNU Magetan.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {SPORTS.map((sport, i) => {
                const Icon = sport.icon;
                return (
                  <motion.div
                    key={sport.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className={`glass-card rounded-xl p-5 group cursor-pointer bg-white ${sport.border}`}
                  >
                    <div className={`icon-box bg-gradient-to-br ${sport.gradient} mb-3 group-hover:rotate-6 transition-transform`}>
                      <Icon size={20} className={sport.iconColor} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{sport.name}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{sport.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
