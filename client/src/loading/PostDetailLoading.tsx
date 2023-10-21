import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailLoading() {
  return (
    <div className="mx-auto max-w-2xl">
      <Skeleton className="w-full h-16 mb-6" />
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="relative text-sm w-full">
        {[...Array(12)].map((_, index) => (
          <Skeleton key={index} className="h-4 w-full mb-6" />
        ))}
      </div>
    </div>
  );
}
