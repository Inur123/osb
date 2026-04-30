import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, PencilIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { deletePendaftar } from "@/app/actions/pendaftar-actions";

export default async function PendaftarPage() {
  const [pendaftars, totalIPNU, totalIPPNU] = await Promise.all([
    prisma.pendaftar.findMany({
      orderBy: { createdAt: "desc" },
      include: { periode: true },
    }),
    prisma.pendaftar.count({ where: { organisasi: "IPNU" } }),
    prisma.pendaftar.count({ where: { organisasi: "IPPNU" } }),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Data Pendaftar</h2>
        <p className="text-muted-foreground text-sm sm:text-lg">Kelola dan pantau seluruh data peserta OSB Magetan.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendaftars.length}</div>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">Registrants</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IPNU (Laki-laki)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalIPNU}</div>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">Anggota IPNU</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IPPNU (Perempuan)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{totalIPPNU}</div>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">Anggota IPPNU</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4 border-b">
          <h3 className="text-lg font-bold">Semua Data Pendaftar</h3>
          <Button size="sm" className="w-full sm:w-auto font-bold">
            <UserPlusIcon className="size-4 mr-2" />
            Eksport Excel
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>PAC</TableHead>
              <TableHead>Organisasi</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendaftars.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{p.nama}</span>
                    <span className="text-[10px] text-muted-foreground">{p.alamat}</span>
                  </div>
                </TableCell>
                <TableCell>{p.asal_pac}</TableCell>
                <TableCell>
                  <Badge variant={p.organisasi === "IPNU" ? "default" : "secondary"}>
                    {p.organisasi}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{p.periode.nama}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="size-8">
                      <EyeIcon className="size-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <PencilIcon className="size-4 text-orange-500" />
                    </Button>
                    <form action={async () => {
                      "use server";
                      await deletePendaftar(p.id);
                    }}>
                      <Button variant="ghost" size="icon" className="size-8 text-red-500">
                        <Trash2Icon className="size-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pendaftars.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                  Belum ada data pendaftar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
    </div>
  );
}
