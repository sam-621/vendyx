import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout, LogoLoader } from '@/lib/components';

import { ConfigProvider } from './config/contexts';
import { useGetAdminUiConfig } from './config/hooks';
import { AuthWrapper } from './auth-wrapper';
import { DashboardPage } from './dashboard';
import { CreateProductPage, ProductDetailsPage, ProductsPage } from './inventory';
import { LoginPage } from './login';
import { OrderDetailsPage, OrderPages } from './orders';

// 1 - Only React components
// Copy the admin-ui dist folder to server
// in bootstrap, get the paths to app component of each ui-extension and return them in the admin-ui-config endpoint
// in admin-ui, get the paths from the admin-ui-config endpoint and render the components

// 2 - Every framework (it would work?)
// Build my extensions
// in bootstrap, get the paths to dist folders of each ui-extension and return them in the admin-ui-config endpoint
// in admin-ui, get the paths from the admin-ui-config endpoint and paste the index.html of each extension in a iframe <iframe src="extension-html.html"></iframe>
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

  return (
    <ConfigProvider value={data}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<AuthWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/inventory" element={<ProductsPage />} />
              <Route path="/inventory/new" element={<CreateProductPage />} />
              <Route path="/inventory/:slug" element={<ProductDetailsPage />} />
              <Route path="/orders" element={<OrderPages />} />
              <Route path="/orders/:slug" element={<OrderDetailsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
