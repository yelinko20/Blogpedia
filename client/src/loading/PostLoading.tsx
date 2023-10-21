import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <div className=" rounded-md p-4">
      <Skeleton className="w-1/4 h-4 mb-2" />
      <Skeleton className="w-2/3 h-4" />
      <div className="grid grid-cols-3 gap-2 sm:gap-6 sm:place-items-center place-content-start">
        <div className="col-start-1 col-span-2">
          <Skeleton className="w-5/6 h-4 mb-2" />
          <Skeleton className="w-full h-4" />
        </div>
        <Skeleton className="w-20 h-20" />
      </div>
    </div>
  );
}
