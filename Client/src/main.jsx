import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Toaster from "./components/ui/sonner.jsx"
import App from './App.jsx'
import { SocketProvider } from './context/socketContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SocketProvider>
      <App />
      <Toaster closeButton/>
  </SocketProvider>
  // </StrictMode>,
)
