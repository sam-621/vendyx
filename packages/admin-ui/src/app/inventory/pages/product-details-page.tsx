import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { PageLayout } from '@/lib/components';
import { LogoLoader } from '@/lib/components/loaders';
import { formatDate } from '@/lib/utils';

import { ProductDetails } from '../components/product-details';
import { ProductDetailsSubmitButton } from '../components/product-details/product-details-submit-button';
import { useProductDetailsForm } from '../components/product-details/use-product-details-form';
import { useGetProductDetails } from '../hooks';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { isLoading, product } = useGetProductDetails(slug ?? '');

  const form = useProductDetailsForm(product);

  if (isLoading) return <LogoLoader />;

  if (!product) {
    return <Navigate to="/inventory" />;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <PageLayout
          title={product.name}
          subtitle={`Added at ${formatDate(new Date(product.createdAt as string))}`}
          actions={<ProductDetailsSubmitButton product={product} />}
          backUrl="/inventory"
          className={{
            main: 'flex flex-col gap-8',
            container: 'w-[775px] mx-auto'
          }}
          stickyHeader
        >
          <ProductDetails product={product} />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
