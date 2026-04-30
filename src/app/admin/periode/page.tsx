import { prisma } from "@/lib/prisma";
import PeriodeClientPage from "@/components/features/periode/periode-list";

export default async function PeriodePage() {
  const periodes = await prisma.periode.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Convert dates to ISO strings to avoid serialization issues
  const serializedPeriodes = periodes.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <PeriodeClientPage initialPeriodes={serializedPeriodes as any} />;
}
