"use client";

import { useState, useCallback } from "react";
import {
  User,
  MapPin,
  Building2,
  CheckSquare,
  Plus,
  X,
  Palette,
  Trophy,
  Send,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import OSBLogo from "@/components/shared/osb-logo";
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

export default function PendaftaranPage() {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    organisasi: "",
    alamat: "",
    asal_pac: "",
    pilihan: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [customInput, setCustomInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
    } else if (!/^[a-zA-Z\s'.]+$/.test(cleanNama)) {
      newErrors.nama = "Nama hanya boleh berisi huruf";
    }

    // 2. Validasi Organisasi
    if (!formData.organisasi) {
      newErrors.organisasi = "Wajib memilih organisasi";
    }

    // 3. Validasi Alamat
    if (!cleanAlamat) {
      newErrors.alamat = "Alamat wajib diisi";
    } else if (cleanAlamat.length > 200) {
      newErrors.alamat = "Alamat terlalu panjang (max. 200 karakter)";
    }

    // 4. Validasi Asal PAC
    if (!cleanPac) {
      newErrors.asal_pac = "Asal PAC wajib diisi";
    } else if (cleanPac.length > 50) {
      newErrors.asal_pac = "Nama PAC terlalu panjang";
    }

    // 5. Validasi Pilihan
    if (formData.pilihan.length === 0) {
      newErrors.pilihan = "Pilih minimal satu minat atau bakat";
    } else if (formData.pilihan.length > 10) {
      newErrors.pilihan = "Maksimal pilih 10 minat/bakat";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Final Sanitization sebelum dikirim
    const finalData = {
      ...formData,
      nama: sanitize(formData.nama),
      alamat: sanitize(formData.alamat),
      asal_pac: sanitize(formData.asal_pac),
      pilihan: formData.pilihan.map(p => sanitize(p))
    };

    console.log("Submitting Secure Data:", finalData);
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-ipnu-100 rounded-full flex items-center justify-center mx-auto text-ipnu-600">
            <Check size={40} strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Data kamu sudah tersimpan di database kami. Terima kasih telah
              berpartisipasi!
            </p>
          </div>
          <Link href="/" className="btn-primary w-full justify-center py-4">
            <ArrowLeft size={18} /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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

              {/* Asal PAC (Input Teks Biasa sesuai permintaan) */}
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
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Lainnya (Jika tidak ada di list)
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tulis minat bakat lainnya..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addCustom())
                    }
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 focus:border-ipnu-500 outline-none text-sm transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={addCustom}
                    className="bg-gray-900 text-white px-4 rounded-xl font-bold text-sm hover:bg-ipnu-600 transition-colors"
                  >
                    Tambah
                  </button>
                </div>

                {/* List pilihan yang sudah dipilih (Termasuk yang custom) */}
                {formData.pilihan.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.pilihan.map((p) => {
                      const isDefault = [
                        ...SENI_BUDAYA_CHOICES,
                        ...OLAHRAGA_CHOICES,
                      ].includes(p as any);
                      if (isDefault) return null; // Hanya tampilkan yang custom/tambahan di sini untuk list remove
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
              className="w-full btn-primary justify-center py-4 text-lg font-black shadow-xl shadow-ipnu-600/20"
            >
              Kirim Pendaftaran <Send size={20} className="ml-1" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
