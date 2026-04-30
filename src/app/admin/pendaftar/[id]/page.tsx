import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, CalendarIcon, UserIcon, MapPinIcon, HeartIcon, BuildingIcon } from "lucide-react";
import Link from "next/link";

export default async function PendaftarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pendaftar = await prisma.pendaftar.findUnique({
    where: { id },
    include: { periode: true },
  });

  if (!pendaftar) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/pendaftar">
            <ArrowLeftIcon className="size-5" />
          </Link>
        </Button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">Detail Pendaftar</h2>
          <p className="text-muted-foreground text-sm">Lihat informasi lengkap peserta.</p>
        </div>
        <Button className="ml-auto bg-primary hover:bg-primary/90 font-bold" asChild>
          <Link href={`/admin/pendaftar/${pendaftar.id}/edit`}>
            <PencilIcon className="size-4 mr-2" />
            Edit Data
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/10 py-4 px-6">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserIcon className="size-5 text-primary" />
            Informasi Lengkap Pendaftar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Section 1: Profil */}
          <div className="p-6 border-b last:border-0">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-primary rounded-full"></span>
              Profil Peserta
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase">Nama Lengkap</p>
                <p className="text-base font-bold">{pendaftar.nama}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase">Organisasi</p>
                <div>
                  <Badge className={pendaftar.organisasi === "IPNU" ? "bg-blue-600" : "bg-pink-600 text-white"}>
                    {pendaftar.organisasi}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase">Asal PAC</p>
                <div className="flex items-center gap-2">
                  <BuildingIcon className="size-4 text-muted-foreground" />
                  <p className="text-sm font-semibold">{pendaftar.asal_pac}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase">Alamat Lengkap</p>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="size-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs">{pendaftar.alamat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Minat & Bakat */}
          <div className="p-6 border-b last:border-0 bg-muted/5">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-red-500 rounded-full"></span>
              Minat & Bakat
            </h4>
            <div className="flex flex-wrap gap-2">
              {pendaftar.minat_bakat.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-background text-[10px] px-3 py-0.5">
                  {item}
                </Badge>
              ))}
              {pendaftar.minat_bakat.length === 0 && (
                <p className="text-xs text-muted-foreground italic">Tidak ada data minat bakat.</p>
              )}
            </div>
          </div>

          {/* Section 3: Administrasi */}
          <div className="p-6">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
              Data Administrasi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
                  <CalendarIcon className="size-4 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Periode Pendaftaran</p>
                  <p className="text-sm font-bold">{pendaftar.periode.nama}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
                  <HeartIcon className="size-4 text-muted-foreground" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase">Waktu Pendaftaran</p>
                  <p className="text-xs font-medium">
                    {new Date(pendaftar.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
