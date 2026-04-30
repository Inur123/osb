"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDaysIcon, PlusIcon, Trash2Icon, PencilIcon, CheckIcon, XIcon, Loader2 } from "lucide-react"
import { createPeriode, deletePeriode, togglePeriodeStatus, updatePeriode } from "@/app/actions/periode-actions"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

interface Periode {
  id: string
  nama: string
  isActive: boolean
  createdAt: Date
}

export default function PeriodeClientPage({ initialPeriodes }: { initialPeriodes: Periode[] }) {
  const [periodes, setPeriodes] = useState(initialPeriodes)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setLoadingId(id)
    const res = await togglePeriodeStatus(id, !currentStatus)
    if (res.success) {
      setPeriodes(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: !currentStatus } : (res.success && !currentStatus ? { ...p, isActive: false } : p)
      ))
      toast.success("Status periode diperbarui")
    } else {
      toast.error(res.error || "Gagal mengubah status")
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    const res = await deletePeriode(id)
    if (res.success) {
      setPeriodes(prev => prev.filter(p => p.id !== id))
      toast.success("Periode berhasil dihapus")
    } else {
      toast.error(res.error || "Gagal menghapus periode")
    }
    setLoadingId(null)
    setDeleteConfirmId(null)
  }

  const handleUpdate = async (id: string) => {
    setLoadingId(id)
    const res = await updatePeriode(id, editValue)
    if (res.success) {
      setPeriodes(prev => prev.map(p => p.id === id ? { ...p, nama: editValue } : p))
      setEditingId(null)
      toast.success("Nama periode diperbarui")
    } else {
      toast.error("Gagal memperbarui nama")
    }
    setLoadingId(null)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Manajemen Periode</h2>
        <p className="text-muted-foreground text-sm sm:text-lg">Kelola rentang waktu pendaftaran pendaftar OSB.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <PlusIcon className="size-5" />
              Tambah Periode
            </CardTitle>
            <CardDescription>Buat periode pendaftaran baru.</CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              ref={formRef}
              action={async (formData) => {
                const nama = formData.get("nama") as string
                if (nama) {
                  const res = await createPeriode(nama)
                  if (res.success && res.data) {
                    setPeriodes(prev => [...prev, res.data!])
                    toast.success("Periode baru ditambahkan")
                    formRef.current?.reset()
                  } else {
                    toast.error(res.error || "Gagal menambah periode")
                  }
                }
              }} 
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input name="nama" placeholder="Contoh: Periode 2025" required className="flex-1" />
              <Button type="submit" className="w-full sm:w-auto">Tambah</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-primary">
              <CalendarDaysIcon className="size-5" />
              Info Sistem
            </CardTitle>
            <CardDescription>Aturan: Minimal harus ada 1 periode aktif.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto p-1">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Periode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {periodes.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {editingId === p.id ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8 w-[200px]"
                      />
                      <Button size="icon" variant="ghost" className="size-8 text-green-600" onClick={() => handleUpdate(p.id)}>
                        <CheckIcon className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="size-8 text-red-600" onClick={() => setEditingId(null)}>
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{p.nama}</span>
                      <Button size="icon" variant="ghost" className="size-6 text-muted-foreground" onClick={() => {
                        setEditingId(p.id)
                        setEditValue(p.nama)
                      }}>
                        <PencilIcon className="size-3" />
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={p.isActive}
                    onCheckedChange={() => handleToggle(p.id, p.isActive)}
                    disabled={loadingId === p.id || (periodes.length <= 1 && p.isActive)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => setDeleteConfirmId(p.id)}
                    disabled={p.isActive || loadingId === p.id}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Periode?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Seluruh data yang terkait dengan periode ini mungkin akan terpengaruh.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
