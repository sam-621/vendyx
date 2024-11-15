import { ProductService } from '@/api/services';
import { InternalApiResponse } from '@/api/utils';

export const GET = async () => {
  const result = await ProductService.getAllForSelector();

  return Response.json(new InternalApiResponse(result));
};
