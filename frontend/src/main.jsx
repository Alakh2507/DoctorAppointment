import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App,ScrollToTop} from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StorContextProvider from './context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StorContextProvider>
      <ScrollToTop/>
      <App />
    </StorContextProvider>
    </BrowserRouter>
)
