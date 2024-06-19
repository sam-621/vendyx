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
  const defaultVariant = product?.variants.items[0];
  const methods = useProductDetailsForm({
    productId: product?.id ?? '',
    variantId: defaultVariant?.id ?? ''
  });

  if (isLoading) return <LogoLoader />;

  if (!product) {
    return <Navigate to="/inventory" />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.onSubmit}>
        <PageLayout
          title={product.name}
          subtitle={`Añadido en ${getFormattedDate(new Date(product.createdAt as string))}`}
          actions={
            <>
              <Button type="button" variant="outline">
                {t('product-details.action.cancel')}
              </Button>
              <Button isLoading={methods.formState.isSubmitting} type="submit">
                {t('product-details.action.save')}
              </Button>
            </>
          }
          back
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
