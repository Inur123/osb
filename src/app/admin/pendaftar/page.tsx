import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, UserCheckIcon, TargetIcon, PaletteIcon, TrophyIcon, SparklesIcon } from "lucide-react";
import { PendaftarList } from "@/components/features/pendaftar/pendaftar-list";

export default async function PendaftarPage() {
  const activePeriode = await prisma.periode.findFirst({
    where: { isActive: true },
  });

  const pendaftar = await prisma.pendaftar.findMany({
    where: activePeriode ? { periodeId: activePeriode.id } : { id: "" },
    include: {
      periode: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate statistics
  const stats = {
    total: pendaftar.length,
    ipnu: pendaftar.filter((p) => p.organisasi === "IPNU").length,
    ippnu: pendaftar.filter((p) => p.organisasi === "IPPNU").length,
  };

  // Calculate Minat & Bakat statistics
  const minatStats = {
    seniBudaya: {
      total: pendaftar.filter(p => p.minat_bakat.some(m => ["Seni Lukis", "Seni Kaligrafi", "Seni Tari", "Seni Pencak Silat"].includes(m))).length,
      items: [
        { label: "Seni Lukis", count: pendaftar.filter(p => p.minat_bakat.includes("Seni Lukis")).length },
        { label: "Seni Kaligrafi", count: pendaftar.filter(p => p.minat_bakat.includes("Seni Kaligrafi")).length },
        { label: "Seni Tari", count: pendaftar.filter(p => p.minat_bakat.includes("Seni Tari")).length },
        { label: "Seni Pencak Silat", count: pendaftar.filter(p => p.minat_bakat.includes("Seni Pencak Silat")).length },
      ]
    },
    olahraga: {
      total: pendaftar.filter(p => p.minat_bakat.some(m => ["Futsal", "Bulutangkis", "Voly"].includes(m))).length,
      items: [
        { label: "Futsal", count: pendaftar.filter(p => p.minat_bakat.includes("Futsal")).length },
        { label: "Bulutangkis", count: pendaftar.filter(p => p.minat_bakat.includes("Bulutangkis")).length },
        { label: "Voly", count: pendaftar.filter(p => p.minat_bakat.includes("Voly")).length },
      ]
    },
    others: pendaftar.filter(p => p.minat_bakat.some(m => !["Seni Lukis", "Seni Kaligrafi", "Seni Tari", "Seni Pencak Silat", "Futsal", "Bulutangkis", "Voly"].includes(m))).length,
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Data Pendaftar
        </h2>
        <p className="text-muted-foreground text-sm">
          Kelola dan pantau seluruh data peserta OSB {activePeriode?.nama || ""}
          .
        </p>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pendaftar
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
              Periode {activePeriode?.nama || ""}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IPNU</CardTitle>
            <UserCheckIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.ipnu}</div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
              Anggota IPNU Terdaftar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IPPNU</CardTitle>
            <TargetIcon className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">
              {stats.ippnu}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
              Anggota IPPNU Terdaftar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interests and Talents Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Seni Budaya Card */}
        <Card className="bg-muted/20 border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                <PaletteIcon className="size-4" />
              </span>
              Seni Budaya
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {minatStats.seniBudaya.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between group">
                <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">{item.label}</span>
                <span className="text-xs font-bold bg-muted/50 px-2 py-0.5 rounded-full">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Olahraga Card */}
        <Card className="bg-muted/20 border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                <TrophyIcon className="size-4" />
              </span>
              Olahraga
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {minatStats.olahraga.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between group">
                <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">{item.label}</span>
                <span className="text-xs font-bold bg-muted/50 px-2 py-0.5 rounded-full">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other Card */}
        <Card className="bg-muted/20 border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                <SparklesIcon className="size-4" />
              </span>
              Minat Lainnya
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <div className="text-3xl font-bold text-purple-600">{minatStats.others}</div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase text-center font-medium">Data Kustom/Lainnya</p>
          </CardContent>
        </Card>
      </div>

      <PendaftarList initialData={pendaftar as any} />
    </div>
  );
}
