import { FormProvider } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { MoveLeftIcon } from 'lucide-react';

import { PageLayout } from '@/components/layout';
import { useGetProductDetails } from '@/core/inventory';

import { ProductDetails } from '../components/product-details';
import { useProductDetailsForm } from '../components/product-details/use-product-details-form';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { isLoading, product } = useGetProductDetails(slug ?? '');
  const defaultVariant = product?.variants.items[0];
  const methods = useProductDetailsForm({
    productId: product?.id ?? '',
    variantId: defaultVariant?.id ?? ''
  });

  if (isLoading) return <h1>Is loading</h1>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.onSubmit}>
        <PageLayout
          title="New product"
          subtitle="Create a product, add prices, content and more"
          actions={
            <>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button isLoading={methods.formState.isSubmitting} type="submit">
                Save
              </Button>
            </>
          }
          icon={
            <Link to={'/inventory'}>
              <MoveLeftIcon />
            </Link>
          }
          className={{
            main: 'flex flex-col gap-8',
            container: 'w-[775px] mx-auto'
          }}
        >
          <ProductDetails product={product} />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
