import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppShell from './app/AppShell.jsx'
import { ProgressProvider } from './features/progress/ProgressContext.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProgressProvider>
        <AppShell />
      </ProgressProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
