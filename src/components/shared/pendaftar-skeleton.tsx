import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PendaftarSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* 3 Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-muted/50 border-none shadow-none">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-muted/30">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <div className="p-0">
          <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_100px] gap-4 p-4 border-b bg-muted/10">
             <Skeleton className="h-4 w-8" />
             {[...Array(5)].map((_, i) => (
               <Skeleton key={i} className="h-4 w-full" />
             ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_100px] gap-4 p-4 border-b last:border-0 items-center">
              <Skeleton className="h-4 w-4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2 justify-end">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
