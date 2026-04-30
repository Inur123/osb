"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Mengubah status aktif/nonaktif suatu periode pendaftaran
 */
export async function togglePeriodeStatus(id: string, status: boolean) {
  try {
    const count = await prisma.periode.count();
    
    if (count <= 1 && !status) {
      return { success: false, error: "Hanya ada 1 periode, status harus tetap Active." };
    }

    if (status) {
      await prisma.periode.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    await prisma.periode.update({
      where: { id },
      data: { isActive: status },
    });

    revalidatePath("/admin/periode");
    revalidatePath("/admin/settings");
    revalidatePath("/pendaftaran");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal mengubah status periode:", error);
    return { success: false, error: "Gagal mengubah status pendaftaran" };
  }
}

/**
 * Update nama periode
 */
export async function updatePeriode(id: string, nama: string) {
  try {
    await prisma.periode.update({
      where: { id },
      data: { nama },
    });
    revalidatePath("/admin/periode");
    return { success: true };
  } catch (error) {
    console.error("Gagal update periode:", error);
    return { success: false, error: "Gagal memperbarui nama periode" };
  }
}

/**
 * Membuat periode baru
 */
export async function createPeriode(nama: string) {
  try {
    const count = await prisma.periode.count();
    
    const newPeriode = await prisma.periode.create({
      data: {
        nama,
        isActive: count === 0,
      },
    });

    revalidatePath("/admin/periode");
    return { success: true, data: newPeriode };
  } catch (error) {
    console.error("Gagal membuat periode:", error);
    return { success: false, error: "Gagal membuat periode baru" };
  }
}

/**
 * Menghapus periode dengan validasi
 */
export async function deletePeriode(id: string) {
  try {
    const period = await prisma.periode.findUnique({ where: { id } });
    if (!period) return { success: false, error: "Periode tidak ditemukan" };

    const count = await prisma.periode.count();
    if (count <= 1) return { success: false, error: "Tidak bisa menghapus satu-satunya periode." };
    if (period.isActive) return { success: false, error: "Periode aktif tidak bisa dihapus." };

    await prisma.periode.delete({ where: { id } });

    revalidatePath("/admin/periode");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus periode:", error);
    return { success: false, error: "Gagal menghapus periode" };
  }
}
