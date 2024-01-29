import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@vendyx/theme';

import { Notification } from '@/lib/notifications';

import { LoginPage } from './ui/login';

import './styles.css';
import '@vendyx/theme/dist/style.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notification />
        <LoginPage />
        {/* <CreateProductPage /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
