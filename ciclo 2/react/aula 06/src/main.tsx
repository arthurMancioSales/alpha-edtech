import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CssBaseLine from '@mui/material/CssBaseline'
import App from './components/app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseLine />
    <App />
  </React.StrictMode>,
)
