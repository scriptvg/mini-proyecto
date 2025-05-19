import './mui-license.js'; // Importa el archivo de licencia aquí
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import AuthProvider from './context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
