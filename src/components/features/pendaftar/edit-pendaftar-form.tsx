"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updatePendaftar } from "@/app/actions/pendaftar-actions";
import { toast } from "sonner";
import { Loader2, ArrowLeftIcon, SaveIcon } from "lucide-react";
import Link from "next/link";

interface Pendaftar {
  id: string;
  nama: string;
  organisasi: "IPNU" | "IPPNU";
  alamat: string;
  asal_pac: string;
  minat_bakat: string[];
}

export function EditPendaftarForm({ pendaftar }: { pendaftar: Pendaftar }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nama: formData.get("nama") as string,
      organisasi: formData.get("organisasi") as any,
      alamat: formData.get("alamat") as string,
      asal_pac: formData.get("asal_pac") as string,
      minat_bakat: pendaftar.minat_bakat, // Keep current
    };

    const res = await updatePendaftar(pendaftar.id, data);
    if (res.success) {
      toast.success("Data berhasil diperbarui");
      router.push("/admin/pendaftar");
      router.refresh();
    } else {
      toast.error(res.error || "Gagal memperbarui data");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/pendaftar/${pendaftar.id}`}>
            <ArrowLeftIcon className="size-5" />
          </Link>
        </Button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Edit Pendaftar</h2>
          <p className="text-muted-foreground text-sm">Perbarui informasi data peserta.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm w-full">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-lg">Formulir Pembaruan</CardTitle>
          <CardDescription>Sesuaikan field di bawah sesuai data terbaru.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nama" className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Nama Lengkap</Label>
                <Input id="nama" name="nama" defaultValue={pendaftar.nama} className="h-10" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="organisasi" className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Organisasi</Label>
                <select 
                  id="organisasi" 
                  name="organisasi" 
                  defaultValue={pendaftar.organisasi}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="IPNU">IPNU</option>
                  <option value="IPPNU">IPPNU</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="asal_pac" className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Asal PAC</Label>
                <Input id="asal_pac" name="asal_pac" defaultValue={pendaftar.asal_pac} className="h-10" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alamat" className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Alamat Lengkap</Label>
                <Input id="alamat" name="alamat" defaultValue={pendaftar.alamat} className="h-10" required />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" className="w-full md:w-32 h-10" asChild>
                <Link href={`/admin/pendaftar/${pendaftar.id}`}>Batal</Link>
              </Button>
              <Button type="submit" className="w-full md:w-48 h-10 bg-primary hover:bg-primary/90 font-bold" disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin mr-2" />
                ) : (
                  <SaveIcon className="size-4 mr-2" />
                )}
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
