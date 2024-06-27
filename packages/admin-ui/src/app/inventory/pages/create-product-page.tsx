import { FormProvider } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { PageLayout } from '@/lib/components';
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
            <Button isLoading={methods.formState.isSubmitting} type="submit">
              {t('product-details.action.save')}
            </Button>
          }
          className={{
            main: 'flex flex-col gap-8',
            container: 'w-[775px] mx-auto'
          }}
          backUrl="/inventory"
          stickyHeader
        >
          <ProductDetails />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
