import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { Button } from '@ebloc/theme';

import { PageLayout } from '@/lib/components';
import { LogoLoader } from '@/lib/components/loaders';
import { t } from '@/lib/locales';
import { getFormattedDate } from '@/lib/utils';

import { ProductDetails } from '../components/product-details';
import { useProductDetailsForm } from '../components/product-details/use-product-details-form';
import { useGetProductDetails } from '../hooks';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { isLoading, product } = useGetProductDetails(slug ?? '');

  const defaultVariant =
    Number(product?.variants.items.length ?? 0) > 1 ? null : product?.variants.items[0];

  const form = useProductDetailsForm({
    productId: product?.id ?? '',
    variantId: defaultVariant?.id ?? ''
  });

  if (isLoading) return <LogoLoader />;

  if (!product) {
    return <Navigate to="/inventory" />;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <PageLayout
          title={product.name}
          subtitle={`Added at ${getFormattedDate(new Date(product.createdAt as string))}`}
          actions={
            <Button
              disabled={!form.formState.isDirty}
              isLoading={form.formState.isSubmitting}
              type="submit"
            >
              {t('product-details.action.save')}
            </Button>
          }
          backUrl="/inventory"
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
