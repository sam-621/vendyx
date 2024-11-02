import { type MetricRange } from '@/api/scalars';
import { MetricsService } from '@/api/services';
import { MetricsCharts } from '@/lib/metrics/components';
import { getDefaultDateRange } from '@/lib/metrics/utils';
import { AdminPageLayout } from '@/lib/shared/components';

export default async function Home({ searchParams }: { searchParams: MetricRange }) {
  const isRangeInSearchParams = searchParams.startsAt && searchParams.endsAt;

  const range: MetricRange = isRangeInSearchParams
    ? { startsAt: new Date(searchParams.startsAt), endsAt: new Date(searchParams.endsAt) }
    : getDefaultDateRange();

  const totalSales = await MetricsService.getTotalSales(range);
  const totalOrders = await MetricsService.getTotalOrders(range);

  return (
    <AdminPageLayout title="Dashboard">
      <div className="flex flex-col gap-8">
        <main>
          <MetricsCharts range={range} totalSales={totalSales} totalOrders={totalOrders} />
        </main>
        {/* <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <DotIcon className="text-distinct w-8 h-8" />
            <h2 className="font-semibold text-base">Pending</h2>
          </div>
          <div>
            <Button variant="secondary" className="flex gap-2">
              <InboxIcon className="w-4 h-4" />8 orders to fulfill
            </Button>
          </div>
        </div> */}
      </div>
    </AdminPageLayout>
  );
}
