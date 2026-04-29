export const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "seni-budaya", label: "Seni & Budaya" },
  { id: "olahraga", label: "Olahraga" },
  { id: "kontak", label: "Kontak" },
] as const;

export const SITE = {
  name: "OSB",
  fullName: "Olahraga, Seni & Budaya",
  org: "PC IPNU IPPNU Magetan",
  orgShort: "IPNU IPPNU Magetan",
  email: "pcipnuippnu.magetan@gmail.com",
  location: "Kabupaten Magetan, Jawa Timur",
  year: 2025,
  timezone: "Asia/Jakarta",
} as const;

export const SENI_BUDAYA_ITEMS = [
  { name: "Seni Lukis", desc: "Ekspresikan kreativitas melalui goresan warna dan imajinasi." },
  { name: "Seni Kaligrafi", desc: "Keindahan aksara Arab yang menjadi karya seni bernilai tinggi." },
  { name: "Seni Tari", desc: "Lestarikan budaya Nusantara melalui gerakan tari tradisional." },
  { name: "Pencak Silat", desc: "Seni bela diri warisan budaya Indonesia yang mengasah mental." },
] as const;

export const OLAHRAGA_ITEMS = [
  { name: "Futsal", desc: "Permainan tim yang mengasah kerjasama dan strategi." },
  { name: "Bulutangkis", desc: "Olahraga raket yang melatih kelincahan dan refleks." },
  { name: "Bola Voli", desc: "Permainan tim yang membangun kekompakan." },
  { name: "Dan Lainnya", desc: "Berbagai cabang olahraga lain yang bisa kamu eksplorasi." },
] as const;
