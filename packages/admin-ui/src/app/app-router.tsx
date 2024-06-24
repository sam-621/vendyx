import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout, LogoLoader } from '@/lib/components';

import { ConfigProvider } from './config/contexts';
import { useGetAdminUiConfig } from './config/hooks';
import { AuthWrapper } from './auth-wrapper';
import { ExtraUiModulePage } from './extra-ui-module-page';
import { CreateProductPage, ProductDetailsPage, ProductsPage } from './inventory';
import { LoginPage } from './login';
import { OrderDetailsPage, OrderPages } from './orders';

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
              <Route path="/inventory" element={<ProductsPage />} />
              <Route path="/inventory/new" element={<CreateProductPage />} />
              <Route path="/inventory/:slug" element={<ProductDetailsPage />} />
              <Route path="/orders" element={<OrderPages />} />
              <Route path="/orders/:slug" element={<OrderDetailsPage />} />

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
