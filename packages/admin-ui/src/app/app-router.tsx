import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';

import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Logged</h1>} />
          <Route path="/products" element={<h1>Logged</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
