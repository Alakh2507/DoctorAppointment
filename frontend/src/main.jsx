import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App,ScrollToTop} from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
      <ScrollToTop/>
      <App />
    </StoreContextProvider>
    </BrowserRouter>
)
