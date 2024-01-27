import { ThemeProvider } from '@vendyx/theme'
import { LoginPage } from './ui/login'

import './styles.css'
import '@vendyx/theme/dist/style.css'

export const App = () => {
  return (
    <ThemeProvider>
      <LoginPage />
    </ThemeProvider>
  )
}
