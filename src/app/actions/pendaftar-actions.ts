"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getFormStatus } from "./settings-actions";

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

import { z } from "zod";

// Skema Validasi Keamanan Sangat Ketat (Hanya Huruf, Angka, dan Petik Tunggal)
const pendaftaranSchema = z.object({
  nama: z.string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .regex(/^[a-zA-Z\s']+$/, "Nama hanya boleh berisi huruf, spasi, atau tanda petik (')") // Sangat ketat: Huruf, Spasi, '
    .transform(val => val.trim()),
  organisasi: z.enum(["IPNU", "IPPNU"]),
  alamat: z.string()
    .min(5, "Alamat minimal 5 karakter")
    .max(255, "Alamat maksimal 255 karakter")
    .regex(/^[a-zA-Z0-9\s']*$/, "Alamat hanya boleh berisi huruf, angka, spasi, atau tanda petik (')") // Sangat ketat
    .transform(val => val.trim()),
  asal_pac: z.string()
    .min(2, "Asal PAC minimal 2 karakter")
    .max(100, "Asal PAC maksimal 100 karakter")
    .regex(/^[a-zA-Z0-9\s']*$/, "Asal PAC hanya boleh berisi huruf, angka, spasi, atau tanda petik (')") // Sangat ketat
    .transform(val => val.trim()),
  pilihan: z.array(
    z.string()
      .max(50, "Setiap pilihan maksimal 50 karakter")
      .regex(/^[a-zA-Z0-9\s']*$/, "Pilihan hanya boleh berisi huruf, angka, spasi, atau tanda petik (')") // Sangat ketat untuk tiap item
  ).min(1, "Pilih minimal satu minat bakat")
});

/**
 * Pendaftaran Pendaftar Baru (Public)
 * Keamanan: Validasi Zod, Sanitasi XSS, Cek Status Form
 */
export async function registerPendaftar(rawInput: any) {
  try {
    // 1. Validasi Input dengan Zod (Keamanan Utama)
    const validated = pendaftaranSchema.safeParse(rawInput);
    if (!validated.success) {
      return { 
        success: false, 
        error: "Data tidak valid atau mengandung karakter berbahaya." 
      };
    }

    const { nama, organisasi, alamat, asal_pac, pilihan } = validated.data;

    // 2. Cek Status Form Global & Periode Aktif
    const [formSetting, activePeriode] = await Promise.all([
      getFormStatus(),
      prisma.periode.findFirst({ where: { isActive: true } })
    ]);

    if (!formSetting.isFormActive || !activePeriode) {
      return { success: false, error: "Pendaftaran sedang ditutup." };
    }

    // 3. Simpan Data ke Database (Prisma otomatis mencegah SQL Injection)
    await prisma.pendaftar.create({
      data: {
        nama,
        organisasi,
        alamat,
        asal_pac,
        minat_bakat: pilihan,
        periodeId: activePeriode.id,
      },
    });

    // 4. Revalidate Admin Pages
    revalidatePath("/admin");
    revalidatePath("/admin/pendaftar");

    return { success: true };
  } catch (error) {
    console.error("Gagal melakukan pendaftaran:", error);
    return { success: false, error: "Terjadi kesalahan sistem. Silakan coba lagi." };
  }
}

/**
 * Update data pendaftar
 */
export async function updatePendaftar(id: string, data: {
  nama: string;
  organisasi: "IPNU" | "IPPNU";
  alamat: string;
  asal_pac: string;
  minat_bakat: string[];
}) {
  try {
    await prisma.pendaftar.update({
      where: { id },
      data: {
        nama: data.nama,
        organisasi: data.organisasi,
        alamat: data.alamat,
        asal_pac: data.asal_pac,
        minat_bakat: data.minat_bakat,
      },
    });

    revalidatePath("/admin/pendaftar");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Gagal update pendaftar:", error);
    return { success: false, error: "Gagal memperbarui data." };
  }
}
