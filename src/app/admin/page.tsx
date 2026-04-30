import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  CalendarIcon,
  TargetIcon,
  UserCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { DashboardCharts } from "@/components/features/dashboard/dashboard-charts";

export default async function AdminDashboardPage() {
  // 1. Dapatkan Periode Aktif Terlebih Dahulu
  const activePeriode = await prisma.periode.findFirst({
    where: { isActive: true },
  });

  const periodeId = activePeriode?.id;

  // 2. Ambil data statistik berdasarkan periode aktif (jika ada)
  const [totalPendaftar, totalIPNU, totalIPPNU, weeklyData] = await Promise.all(
    [
      prisma.pendaftar.count({ where: periodeId ? { periodeId } : { id: "" } }),
      prisma.pendaftar.count({
        where: periodeId ? { organisasi: "IPNU", periodeId } : { id: "" },
      }),
      prisma.pendaftar.count({
        where: periodeId ? { organisasi: "IPPNU", periodeId } : { id: "" },
      }),
      getWeeklyData(periodeId),
    ],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-sm sm:text-lg">
          Pusat kontrol dan monitoring pendaftaran OSB.
        </p>
      </div>

      <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Peserta</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPendaftar}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Periode {activePeriode?.nama || "Aktif"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Periode Aktif</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">
              {activePeriode?.nama || "Tutup"}
            </div>
            <Badge
              variant={activePeriode ? "default" : "destructive"}
              className="mt-1 text-[10px]"
            >
              {activePeriode ? "Open" : "Closed"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IPNU</CardTitle>
            <UserCheckIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalIPNU}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pendaftar Laki-laki
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IPPNU</CardTitle>
            <TargetIcon className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{totalIPPNU}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pendaftar Perempuan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <DashboardCharts
        weeklyData={weeklyData}
        genderData={[
          { name: "IPNU", value: totalIPNU, fill: "#2563eb" },
          { name: "IPPNU", value: totalIPPNU, fill: "#db2777" },
        ]}
      />
    </div>
  );
}

async function getWeeklyData(periodeId?: string) {
  const data = [];
  const now = new Date();

  if (!periodeId) {
    return [5, 4, 3, 2, 1, 0].map((i) => ({
      week: `W-${i === 0 ? "Now" : i}`,
      count: 0,
    }));
  }

  for (let i = 5; i >= 0; i--) {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (i * 7 + now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const count = await prisma.pendaftar.count({
      where: {
        periodeId: periodeId,
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    data.push({
      week: `W-${i === 0 ? "Now" : i}`,
      count,
    });
  }

  return data;
}
