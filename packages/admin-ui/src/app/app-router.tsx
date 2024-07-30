import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';
import { AdminLayout } from '@/lib/shared';

import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" element={<h1>Logged</h1>} />
            <Route path="/products" element={<h1>Logged</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
