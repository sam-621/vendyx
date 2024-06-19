import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '@/lib/components';

import { AuthWrapper } from './auth-wrapper';
import { CreateProductPage, ProductDetailsPage, ProductsPage } from './inventory';
import { LoginPage } from './login';
import { OrderDetailsPage, OrderPages } from './orders';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="/inventory" element={<ProductsPage />} />
            <Route path="/inventory/new" element={<CreateProductPage />} />
            <Route path="/inventory/:slug" element={<ProductDetailsPage />} />
            <Route path="/orders" element={<OrderPages />} />
            <Route path="/orders/:slug" element={<OrderDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
