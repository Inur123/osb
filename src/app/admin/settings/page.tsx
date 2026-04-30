import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PeriodToggle } from "@/components/shared/period-toggle";
import { SettingsIcon, ShieldCheckIcon } from "lucide-react";

export default async function SettingsPage() {
  const activePeriode = await prisma.periode.findFirst({
    where: { isActive: true },
  });

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Pengaturan Sistem</h2>
        <p className="text-muted-foreground text-sm sm:text-lg">
          Kelola akses dan konfigurasi pendaftaran OSB Magetan.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <Card className="border-none shadow-sm bg-muted/40 p-0 sm:p-4 overflow-hidden">
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <div className="flex items-center gap-3 mb-1 text-primary">
              <ShieldCheckIcon className="size-5 sm:size-6" />
              <CardTitle className="text-lg sm:text-xl font-bold">Akses Pendaftaran</CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base leading-relaxed">
              Gunakan sakelar di bawah ini untuk membuka atau menutup formulir
              pendaftaran bagi publik.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="bg-background rounded-2xl border p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-base sm:text-lg">Status Formulir</span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                    {activePeriode
                      ? `Terbuka untuk periode ${activePeriode.nama}. Calon peserta dapat mendaftar.`
                      : "Ditutup. Calon peserta tidak dapat mengakses formulir."}
                  </p>
                </div>
                <div className="w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-muted flex justify-start sm:justify-end">
                  <PeriodToggle activePeriode={activePeriode} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-muted/40 p-0 sm:p-4 opacity-70">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-1">
              <SettingsIcon className="size-5 sm:size-6 text-muted-foreground" />
              <CardTitle className="text-lg sm:text-xl font-bold text-muted-foreground">Otomatisasi Sistem</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Fitur pembatasan kuota otomatis (Segera Hadir).
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
