import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '../src/styles/tailwind.css'
import '../src/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
