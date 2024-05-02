import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { MoveLeftIcon } from 'lucide-react';

import { PageLayout } from '@/components/layout';
import { t } from '@/lib/locales';

import { ProductDetails } from '../components/product-details';
import { useProductDetailsForm } from '../components/product-details/use-product-details-form';

export const CreateProductPage = () => {
  const methods = useProductDetailsForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.onSubmit}>
        <PageLayout
          title={t('product-details.title')}
          subtitle={t('product-details.subtitle')}
          actions={
            <>
              <Button type="button" variant="secondary">
                {t('product-details.action.cancel')}
              </Button>
              <Button isLoading={methods.formState.isSubmitting} type="submit">
                {t('product-details.action.save')}
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
          <ProductDetails />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
