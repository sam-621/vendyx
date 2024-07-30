import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/lib/auth';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Logged</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
