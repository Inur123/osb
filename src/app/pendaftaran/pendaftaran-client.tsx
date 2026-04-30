"use client";

import { useState, useCallback } from "react";
import {
  User,
  X,
  Palette,
  Trophy,
  Send,
  ArrowLeft,
  Check,
  Loader2,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OSBLogo from "@/components/shared/osb-logo";
import { registerPendaftar } from "@/app/actions/pendaftar-actions";
import { RealtimeStatusListener } from "@/components/shared/realtime-status-listener";
import {
  SENI_BUDAYA_CHOICES,
  OLAHRAGA_CHOICES,
} from "@/lib/pendaftaran-data";

// ===== Types =====
type FormData = {
  nama: string;
  organisasi: "IPNU" | "IPPNU" | "";
  alamat: string;
  asal_pac: string;
  pilihan: string[];
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ===== Choice Pill Component =====
function ChoicePill({
  label,
  selected,
  onToggle,
  color = "ipnu",
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  color?: "ipnu" | "amber";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-2 ${
        selected
          ? color === "amber"
            ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20"
            : "bg-ipnu-600 border-ipnu-600 text-white shadow-lg shadow-ipnu-600/20"
          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
      }`}
    >
      {selected && <Check size={14} strokeWidth={3} />}
      {label}
    </button>
  );
}

export default function PendaftaranClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    organisasi: "",
    alamat: "",
    asal_pac: "",
    pilihan: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [customInput, setCustomInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle pilihan (Bisa pilih lebih dari 1)
  const togglePilihan = useCallback((item: string) => {
    setFormData((prev) => ({
      ...prev,
      pilihan: prev.pilihan.includes(item)
        ? prev.pilihan.filter((p) => p !== item)
        : [...prev.pilihan, item],
    }));
  }, []);

  // Tambah pilihan "DLL" (Custom)
  const addCustom = useCallback(() => {
    const val = customInput.trim();
    if (!val) return;
    if (formData.pilihan.includes(val)) {
      setCustomInput("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      pilihan: [...prev.pilihan, val],
    }));
    setCustomInput("");
  }, [customInput, formData.pilihan]);

  const removePilihan = useCallback((item: string) => {
    setFormData((prev) => ({
      ...prev,
      pilihan: prev.pilihan.filter((p) => p !== item),
    }));
  }, []);

  // Fungsi Sanitasi Sederhana (Hapus HTML tags)
  const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, "").trim();

  // Validasi sederhana namun kuat
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Sanitasi semua input teks
    const cleanNama = sanitize(formData.nama);
    const cleanAlamat = sanitize(formData.alamat);
    const cleanPac = sanitize(formData.asal_pac);

    // 1. Validasi Nama
    if (!cleanNama) {
      newErrors.nama = "Nama lengkap wajib diisi";
    } else if (cleanNama.length < 3) {
      newErrors.nama = "Nama terlalu pendek (min. 3 karakter)";
    } else if (cleanNama.length > 50) {
      newErrors.nama = "Nama terlalu panjang (max. 50 karakter)";
    }

    // 2. Validasi Organisasi
    if (!formData.organisasi) {
      newErrors.organisasi = "Wajib memilih organisasi";
    }

    // 3. Validasi Alamat
    if (!cleanAlamat) {
      newErrors.alamat = "Alamat wajib diisi";
    }

    // 4. Validasi Asal PAC
    if (!cleanPac) {
      newErrors.asal_pac = "Asal PAC wajib diisi";
    }

    // 5. Validasi Pilihan
    if (formData.pilihan.length === 0) {
      newErrors.pilihan = "Pilih minimal satu minat atau bakat";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Silakan lengkapi formulir dengan benar.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Final Sanitization sebelum dikirim
      const finalData = {
        nama: sanitize(formData.nama),
        organisasi: formData.organisasi as "IPNU" | "IPPNU",
        alamat: sanitize(formData.alamat),
        asal_pac: sanitize(formData.asal_pac),
        pilihan: formData.pilihan.map(p => sanitize(p))
      };

      const res = await registerPendaftar(finalData);

      if (res.success) {
        toast.success("Pendaftaran Berhasil!");
        
        // Buat query params dari data
        const params = new URLSearchParams();
        params.set("nama", finalData.nama);
        params.set("organisasi", finalData.organisasi);
        params.set("alamat", finalData.alamat);
        params.set("asal_pac", finalData.asal_pac);
        params.set("pilihan", finalData.pilihan.join(","));
        
        router.push(`/success?${params.toString()}`);
      } else {
        toast.error(res.error || "Gagal melakukan pendaftaran.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Listener Realtime */}
      <RealtimeStatusListener />
      {/* Navbar Simple */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <OSBLogo />
            <div className="hidden sm:block">
              <p className="text-sm font-black text-gray-900 leading-none">
                OSB
              </p>
              <p className="text-[10px] font-bold text-ipnu-600 uppercase">
                IPNU IPPNU Magetan
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-gray-500 hover:text-ipnu-600 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Formulir Pendaftaran
          </h1>
          <p className="text-gray-500">
            Silakan isi data diri dan minat bakat kamu di bawah ini.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section: Identitas */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-ipnu-600 mb-2">
              <User size={20} strokeWidth={2.5} />
              <h2 className="text-lg font-black uppercase tracking-tight">
                Identitas Diri
              </h2>
            </div>

            <div className="grid gap-5">
              {/* Nama */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Irrandy Andhana Nuriza"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, nama: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all outline-none bg-gray-50/50 focus:bg-white focus:border-ipnu-500 ${errors.nama ? "border-red-200" : "border-gray-100"}`}
                />
                {errors.nama && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.nama}
                  </p>
                )}
              </div>

              {/* Organisasi */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700">
                  Organisasi <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({...p, organisasi: "IPNU"}))}
                    className={`flex-1 py-3.5 rounded-xl border-2 font-black transition-all flex items-center justify-center gap-2 ${
                      formData.organisasi === "IPNU"
                        ? "bg-ipnu-600 border-ipnu-600 text-white shadow-lg shadow-ipnu-600/20"
                        : "bg-gray-50/50 border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {formData.organisasi === "IPNU" && <Check size={18} strokeWidth={3} />}
                    IPNU
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(p => ({...p, organisasi: "IPPNU"}))}
                    className={`flex-1 py-3.5 rounded-xl border-2 font-black transition-all flex items-center justify-center gap-2 ${
                      formData.organisasi === "IPPNU"
                        ? "bg-ipnu-600 border-ipnu-600 text-white shadow-lg shadow-ipnu-600/20"
                        : "bg-gray-50/50 border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {formData.organisasi === "IPPNU" && <Check size={18} strokeWidth={3} />}
                    IPPNU
                  </button>
                </div>
                {errors.organisasi && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.organisasi}
                  </p>
                )}
              </div>

              {/* Alamat */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jl. Raya No. 123, Magetan"
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, alamat: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all outline-none bg-gray-50/50 focus:bg-white focus:border-ipnu-500 ${errors.alamat ? "border-red-200" : "border-gray-100"}`}
                />
                {errors.alamat && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.alamat}
                  </p>
                )}
              </div>

              {/* Asal PAC */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Asal PAC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tuliskan asal PAC kamu..."
                  value={formData.asal_pac}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, asal_pac: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all outline-none bg-gray-50/50 focus:bg-white focus:border-ipnu-500 ${errors.asal_pac ? "border-red-200" : "border-gray-100"}`}
                />
                {errors.asal_pac && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.asal_pac}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Minat Bakat */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Trophy size={20} strokeWidth={2.5} />
              <h2 className="text-lg font-black uppercase tracking-tight">
                Pilihan Minat & Bakat <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="space-y-8 bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
              {/* Seni Budaya */}
              <div className="space-y-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Palette size={14} /> Seni Budaya
                </p>
                <div className="flex flex-wrap gap-2">
                  {SENI_BUDAYA_CHOICES.map((choice) => (
                    <ChoicePill
                      key={choice}
                      label={choice}
                      selected={formData.pilihan.includes(choice)}
                      onToggle={() => togglePilihan(choice)}
                      color="amber"
                    />
                  ))}
                </div>
              </div>

              {/* Olahraga */}
              <div className="space-y-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Trophy size={14} /> Olahraga
                </p>
                <div className="flex flex-wrap gap-2">
                  {OLAHRAGA_CHOICES.map((choice) => (
                    <ChoicePill
                      key={choice}
                      label={choice}
                      selected={formData.pilihan.includes(choice)}
                      onToggle={() => togglePilihan(choice)}
                      color="ipnu"
                    />
                  ))}
                </div>
              </div>

              {/* DLL / Custom */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Lainnya (Jika tidak ada di list)
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium italic">
                      *Ketik bakatmu di kolom bawah lalu klik tombol "Tambah"
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: Seni Musik, Menulis, dll..."
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addCustom())
                      }
                      className="flex-1 px-4 py-3.5 rounded-xl border-2 border-dashed border-gray-200 focus:border-ipnu-500 outline-none text-sm transition-all bg-white"
                    />
                    <button
                      type="button"
                      onClick={addCustom}
                      className="bg-gray-900 text-white px-6 py-3.5 sm:py-0 rounded-xl font-bold text-sm transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <Plus size={16} strokeWidth={3} />
                      Tambah
                    </button>
                  </div>

                {/* List pilihan yang sudah dipilih */}
                {formData.pilihan.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.pilihan.map((p) => {
                      const isDefault = [
                        ...SENI_BUDAYA_CHOICES,
                        ...OLAHRAGA_CHOICES,
                      ].includes(p as any);
                      if (isDefault) return null;
                      return (
                        <div
                          key={p}
                          className="flex items-center gap-1.5 bg-white border border-gray-100 pl-3 pr-1.5 py-1.5 rounded-lg shadow-sm"
                        >
                          <span className="text-xs font-bold text-gray-700">
                            {p}
                          </span>
                          <button
                            type="button"
                            onClick={() => removePilihan(p)}
                            className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {errors.pilihan && (
              <p className="text-xs font-bold text-red-500">{errors.pilihan}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center py-4 text-lg font-black shadow-xl shadow-ipnu-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  Mengirim... <Loader2 size={20} className="ml-1 animate-spin" />
                </>
              ) : (
                <>
                  Kirim Pendaftaran <Send size={20} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
