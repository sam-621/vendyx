import { notFound } from 'next/navigation';

import { ProductService } from '@/api';
import { ProductDetailsForm } from '@/components/product';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await ProductService.getById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsForm product={product} />;
}
