"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  EyeIcon, 
  PencilIcon, 
  Trash2Icon, 
  UserPlusIcon, 
  Loader2, 
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "lucide-react";
import { deletePendaftar } from "@/app/actions/pendaftar-actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Pendaftar {
  id: string;
  nama: string;
  organisasi: "IPNU" | "IPPNU";
  alamat: string;
  asal_pac: string;
  minat_bakat: string[];
  periode: {
    nama: string;
  };
}

const ITEMS_PER_PAGE = 10;

export function PendaftarList({ initialData }: { initialData: Pendaftar[] }) {
  const [data, setData] = useState(initialData);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOrg, setFilterOrg] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.asal_pac.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOrg = filterOrg === "ALL" || p.organisasi === filterOrg;
      return matchesSearch && matchesOrg;
    });
  }, [data, searchQuery, filterOrg]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    const res = await deletePendaftar(id);
    if (res.success) {
      setData((prev) => prev.filter((p) => p.id !== id));
      toast.success("Pendaftar berhasil dihapus");
    } else {
      toast.error(res.error || "Gagal menghapus");
    }
    setLoadingId(null);
    setDeleteId(null);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await fetch("/admin/pendaftar/export");
      if (!response.ok) throw new Error("Gagal mengunduh file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Data_Pendaftar_OSB_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Data berhasil dieksport");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengeksport data");
    } finally {
      setIsExporting(false);
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterOrg]);

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      {/* Integrated Toolbar in Header (The Design You Want) */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-3 border-b bg-muted/5">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input 
            placeholder="Cari nama pendaftar..." 
            className="pl-10 h-10 text-sm border-none bg-muted/30 focus-visible:bg-background transition-all w-full shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={filterOrg} onValueChange={(val: any) => setFilterOrg(val)}>
            <SelectTrigger className="w-full sm:w-[160px] h-10 text-xs font-semibold border-none bg-muted/30">
              <SelectValue placeholder="Semua Organisasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Organisasi</SelectItem>
              <SelectItem value="IPNU">IPNU</SelectItem>
              <SelectItem value="IPPNU">IPPNU</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            size="sm" 
            className="h-10 px-4 font-bold bg-green-600 hover:bg-green-700 text-xs w-full sm:w-[160px] shadow-sm disabled:opacity-70"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Mengeksport...
              </>
            ) : (
              <>
                <DownloadIcon className="size-4 mr-2" />
                Eksport Excel
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/10 hover:bg-muted/10">
              <TableHead className="w-[50px] text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">No</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nama</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">PAC</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-center">Organisasi</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Minat/Bakat</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((p, index) => (
              <TableRow key={p.id} className="hover:bg-muted/5 transition-colors group border-b last:border-0">
                <TableCell className="text-center text-xs text-muted-foreground font-medium">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors capitalize">
                    {p.nama.toLowerCase()}
                  </span>
                </TableCell>
                <TableCell className="text-xs font-semibold capitalize">
                  {p.asal_pac.toLowerCase()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    className={`text-[9px] px-2 py-0.5 font-bold rounded-sm border-none shadow-none ${p.organisasi === "IPNU" ? "bg-blue-600" : "bg-pink-600 text-white"}`}
                  >
                    {p.organisasi}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[150px] truncate text-[10px] text-muted-foreground font-medium capitalize">
                  {p.minat_bakat.join(", ").toLowerCase()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" className="text-blue-500 hover:bg-blue-50" asChild>
                      <Link href={`/admin/pendaftar/${p.id}`} title="Detail"><EyeIcon className="size-4" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-orange-500 hover:bg-orange-50" asChild>
                      <Link href={`/admin/pendaftar/${p.id}/edit`} title="Edit"><PencilIcon className="size-4" /></Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon-sm" 
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => setDeleteId(p.id)}
                      disabled={loadingId === p.id}
                      title="Hapus"
                    >
                      {loadingId === p.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2Icon className="size-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-muted-foreground text-sm italic">
                  Data pendaftar tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/5">
          <p className="text-[10px] text-muted-foreground font-medium">
            Menampilkan data <span className="text-foreground font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> sampai <span className="text-foreground font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> dari total <span className="text-foreground font-bold">{filteredData.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" size="icon-xs" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeftIcon className="size-3.5" />
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-muted-foreground px-2">Halaman {currentPage} dari {totalPages}</span>
            </div>
            <Button 
              variant="outline" size="icon-xs" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-red-600 text-lg">Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-9 text-xs font-semibold">Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold h-9 text-xs px-6"
            >
              Ya, Hapus Permanen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
