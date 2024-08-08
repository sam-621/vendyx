import { notFound } from 'next/navigation';

import { ProductDetailsForm } from '@/lib/product';
import { productService } from '@/lib/shared/api';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await productService.getById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsForm product={product} />;
}
