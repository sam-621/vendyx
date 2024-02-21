import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '@/components/layout';

import { CreateProductPage, ProductsPage } from './ui/inventory';
import { LoginPage } from './ui/login';
import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="/inventory" element={<ProductsPage />} />
          <Route path="/inventory/new" element={<CreateProductPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
