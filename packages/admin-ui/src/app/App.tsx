import { ThemeProvider } from '@vendyx/theme'

import './styles.css'
import '@vendyx/theme/dist/style.css'
import { LoginPage } from './ui/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoginPage />
        {/* <CreateProductPage /> */}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
