import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [setting, totalPendaftar] = await Promise.all([
      prisma.systemSetting.findUnique({ where: { id: "main" } }),
      prisma.pendaftar.count(),
    ]);

    return NextResponse.json({
      isFormActive: setting?.isFormActive ?? true,
      totalPendaftar,
    });
  } catch {
    return NextResponse.json({ isFormActive: true, totalPendaftar: 0 });
  }
}
