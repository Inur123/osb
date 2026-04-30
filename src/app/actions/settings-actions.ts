"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Mendapatkan status pendaftaran global
 */
export async function getFormStatus() {
  try {
    let setting = await prisma.systemSetting.findUnique({
      where: { id: "main" },
    });

    // Jika belum ada, buat baru secara aman
    if (!setting) {
      try {
        setting = await prisma.systemSetting.create({
          data: { id: "main", isFormActive: true },
        });
      } catch (e) {
        // Jika gagal karena sudah dibuat oleh request lain, ambil lagi
        setting = await prisma.systemSetting.findUnique({
          where: { id: "main" },
        });
      }
    }

    return setting || { id: "main", isFormActive: true };
  } catch (error) {
    console.error("Gagal mendapatkan status form:", error);
    return { id: "main", isFormActive: true };
  }
}

/**
 * Mengubah status pendaftaran global (Buka/Tutup)
 */
export async function toggleFormStatus(status: boolean) {
  try {
    await prisma.systemSetting.upsert({
      where: { id: "main" },
      update: { isFormActive: status },
      create: { id: "main", isFormActive: status },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/pendaftaran");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gagal mengubah status form:", error);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}
