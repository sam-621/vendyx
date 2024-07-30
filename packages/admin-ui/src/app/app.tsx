import { ThemeProvider } from '@ebloc/theme';
import { QueryClientProvider } from '@tanstack/react-query';

import { Notification, queryClient } from '@/lib/shared';

import { AppRouter } from './app-router';

import './globals.css';
import '@ebloc/theme/dist/style.css';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notification />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
