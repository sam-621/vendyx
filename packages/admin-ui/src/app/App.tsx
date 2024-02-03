import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@vendyx/theme';

import { Notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { AppRouter } from './app-router';

import './styles.css';
import '@vendyx/theme/dist/style.css';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notification />
        <AppRouter />
        {/* <CreateProductPage /> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
