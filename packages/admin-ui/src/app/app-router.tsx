import {
  BrowserRouter,
  // createBrowserRouter,
  Route,
  // RouterProvider,
  Routes
} from 'react-router-dom';

import { CreateProductPage } from './ui/inventory';
import { LoginPage } from './ui/login';
import { AuthWrapper } from './auth-wrapper';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<AppLayout />} errorElement={<RootErrorPage />}> */}

        <Route path="/inventory" element={<CreateProductPage />} />
        {/* <Route path="/inventory/create" element={<CreateProductPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
