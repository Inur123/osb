import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-72" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-muted/50 border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-[70%] border rounded-xl bg-card shadow-sm h-[400px]">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="flex items-end gap-2 h-[280px] px-6">
             {[...Array(6)].map((_, i) => (
               <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 80 + 20}%` }} />
             ))}
          </CardContent>
        </Card>
        
        <Card className="lg:w-[30%] border rounded-xl bg-card shadow-sm h-[400px]">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-8">
            <Skeleton className="h-48 w-48 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
