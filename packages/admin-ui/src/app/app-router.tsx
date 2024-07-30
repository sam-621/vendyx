import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';
import { ProductsPage } from '@/lib/product';
import { AdminLayout, AdminPageLayout } from '@/lib/shared';

import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminLayout />}>
            <Route
              path="/"
              element={
                <AdminPageLayout breadcrumbs={[{ label: 'Products' }]}>
                  <h1>Logged</h1>
                </AdminPageLayout>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
