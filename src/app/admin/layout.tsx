import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { RealtimeDashboard } from "@/components/features/dashboard/realtime-dashboard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activePeriode = await prisma.periode.findFirst({
    where: { isActive: true },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <RealtimeDashboard />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-transparent min-w-0">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">
                  Pusat Kontrol
                </span>
                <h1 className="text-sm font-bold text-foreground leading-none">
                  OSB Admin Panel
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  Periode Aktif:
                </span>
                <span className="text-xs font-bold text-primary">
                  {activePeriode?.nama || "Tidak Ada"}
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 font-bold px-3 py-1"
              >
                {activePeriode ? "ONLINE" : "OFFLINE"}
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
            <div className="mx-auto w-full animate-in fade-in duration-700">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
