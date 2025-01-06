import { StrictMode } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
             <Route path="/" element={ <App/> } />
             <Route path="/login" element={ <LoginPage/> } />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
