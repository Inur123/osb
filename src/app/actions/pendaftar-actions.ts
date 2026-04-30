"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Menghapus pendaftar
 */
export async function deletePendaftar(id: string) {
  try {
    await prisma.pendaftar.delete({ where: { id } });
    revalidatePath("/admin/pendaftar");
    revalidatePath("/admin"); // Revalidate dashboard as well
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus pendaftar:", error);
    return { success: false, error: "Gagal menghapus pendaftar" };
  }
}
