import { notFound } from 'next/navigation';

import { ProductService } from '@/api';
import { ProductDetailsForm } from '@/lib/product/components';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await ProductService.getById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsForm product={product} />;
}
