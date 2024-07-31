import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';
import { CreateProductPage, ProductsPage } from '@/lib/product';
import { AdminLayout } from '@/lib/shared';

import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<CreateProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
