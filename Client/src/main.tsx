import { StrictMode } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
             <Route path="/" element={ <App/> } />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
