import { type NextRequest } from 'next/server';

import { CustomerService } from '@/api/services';
import { InternalApiResponse } from '@/api/utils';
import { getSkip } from '@/lib/shared/components';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const customerId = searchParams.get('customerId');
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));
  const search = searchParams.get('search');

  console.log({
    customerId,
    page,
    size,
    search
  });

  const result = await CustomerService.getOrders(customerId ?? '', {
    skip: getSkip(page, size),
    take: size,
    filters: {
      code: search
    }
  });

  return Response.json(new InternalApiResponse(result));
};
