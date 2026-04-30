import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PeriodeSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form Card Skeleton */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </CardContent>
        </Card>

        {/* Info Card Skeleton */}
        <Card className="bg-muted/50 border-none shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
        </Card>
      </div>

      {/* Simplified Table Skeleton */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 border-b bg-muted/10">
           <Skeleton className="h-4 w-32" />
           <Skeleton className="h-4 w-24" />
           <Skeleton className="h-4 w-12 ml-auto" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 p-4 border-b last:border-0 items-center">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <div className="flex gap-2 justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
