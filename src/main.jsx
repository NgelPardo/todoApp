import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

import { ToDoApp } from './ToDoApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>,
)
