import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditPendaftarForm } from "@/components/features/pendaftar/edit-pendaftar-form";

export default async function EditPendaftarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pendaftar = await prisma.pendaftar.findUnique({
    where: { id },
  });

  if (!pendaftar) notFound();

  return <EditPendaftarForm pendaftar={pendaftar as any} />;
}
