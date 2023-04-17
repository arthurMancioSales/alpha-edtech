import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CounterList from './components/counterList'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ul>
      <CounterList />
    </ul>
  </React.StrictMode>,
)
