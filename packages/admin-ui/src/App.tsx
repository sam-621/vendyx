import { Button, ThemeProvider } from '@vendyx/theme'

import './styles.css'
import '@vendyx/theme/dist/style.css'

function App() {
  return (
    <ThemeProvider>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button>Click me</Button>
    </ThemeProvider>
  )
}

export default App
