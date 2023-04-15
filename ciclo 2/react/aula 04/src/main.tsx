import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Contador from './components/counter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Contador />
  </React.StrictMode>,
)
