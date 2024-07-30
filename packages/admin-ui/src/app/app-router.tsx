import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';
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
                <AdminPageLayout
                  breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Products' }]}
                >
                  <h1>Logged</h1>
                </AdminPageLayout>
              }
            />
            <Route
              path="/products"
              element={
                <AdminPageLayout
                  breadcrumbs={[{ label: 'Dashboard', to: '/' }, { label: 'Products' }]}
                >
                  <h1>Logged</h1>
                </AdminPageLayout>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
