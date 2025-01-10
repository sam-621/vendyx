import { cn } from '@/shared/utils/theme';

/**
 * @example
 * <Skeleton className="w-[100px] h-[20px] rounded-full" />
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />;
}

export { Skeleton };
