import { ThemeProvider } from '@vendyx/theme'

import './styles.css'
import '@vendyx/theme/dist/style.css'
import { CreateProductPage } from './ui/inventory'

export const App = () => {
  return (
    <ThemeProvider>
      {/* <LoginPage /> */}
      <CreateProductPage />
    </ThemeProvider>
  )
}
