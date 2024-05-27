import { Skeleton } from '@vendyx/theme';

export const DataTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-7 w-20" />
      </div>
      <div>
        <div
          role="status"
          className="space-y-4 border divide-y rounded-md shadow animate-pulse md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-32 h-2 rounded-full" />
              <Skeleton className="w-20 h-2 rounded-full" />
            </div>
            <Skeleton className="w-16 h-2.5 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-32 h-2 rounded-full" />
              <Skeleton className="w-20 h-2 rounded-full" />
            </div>
            <Skeleton className="w-16 h-2.5 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-32 h-2 rounded-full" />
              <Skeleton className="w-20 h-2 rounded-full" />
            </div>
            <Skeleton className="w-16 h-2.5 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-32 h-2 rounded-full" />
              <Skeleton className="w-20 h-2 rounded-full" />
            </div>
            <Skeleton className="w-16 h-2.5 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col gap-2.5">
              <Skeleton className="w-32 h-2 rounded-full" />
              <Skeleton className="w-20 h-2 rounded-full" />
            </div>
            <Skeleton className="w-16 h-2.5 rounded-full" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
