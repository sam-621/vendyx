import { ProductService } from '@/api/services';
import { InternalApiResponse } from '@/api/utils';

export const GET = async () => {
  const result = await ProductService.getAll();

  return Response.json(new InternalApiResponse(result));
};
