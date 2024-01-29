import { ThemeProvider } from '@vendyx/theme'

import './styles.css'
import '@vendyx/theme/dist/style.css'
import { LoginPage } from './ui/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Notification } from '@/lib/notifications'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Notification />
        <LoginPage />
        {/* <CreateProductPage /> */}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
