import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout, LogoLoader } from '@/lib/components';

import { ConfigProvider } from './config/contexts';
import { useGetAdminUiConfig } from './config/hooks';
import { CustomerDetailsPage } from './customer/pages/customer-details-page';
import { AuthWrapper } from './auth-wrapper';
import { CollectionsPage } from './collections';
import { CustomersPage } from './customer';
import { ExtraUiModulePage } from './extra-ui-module-page';
import { LoginPage } from './login';
import { OrderDetailsPage, OrderPages } from './orders';
import { CreateProductPage, ProductDetailsPage, ProductsPage } from './products';

export const AppRouter = () => {
  const { data, isLoading } = useGetAdminUiConfig();

  if (isLoading)
    return (
      <div className="h-screen">
        <LogoLoader />;
      </div>
    );

  // TODO: Add a error ui
  if (!data) return null;

  const { extraUiModules } = data;

  return (
    <ConfigProvider value={data}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<AuthWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AdminLayout />}>
              {/* <Route path="/" element={<DashboardPage />} /> */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/new" element={<CreateProductPage />} />
              <Route path="/products/:slug" element={<ProductDetailsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/orders" element={<OrderPages />} />
              <Route path="/orders/:slug" element={<OrderDetailsPage />} />
              <Route path="/orders/:slug" element={<OrderDetailsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/:id" element={<CustomerDetailsPage />} />

              {extraUiModules.map(uiModule => (
                <Route
                  key={uiModule.slug}
                  path={uiModule.slug}
                  element={
                    <Suspense fallback={<LogoLoader />}>
                      <ExtraUiModulePage id={uiModule.id} />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
