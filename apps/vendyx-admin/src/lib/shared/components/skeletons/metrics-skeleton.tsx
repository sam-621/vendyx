import { Skeleton } from '../ui/skeleton';

export const MetricsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div>
        <Skeleton className="h-[416px] w-full" />
      </div>
    </div>
  );
};
