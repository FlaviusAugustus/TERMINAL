import { StrictMode } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from "./components/Navbar/Navbar.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={ <App/> } />
              <Route path="/settings" element={ <SettingsPage/> } />
              <Route path="/login" element={ <LoginPage/> } />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={ <NotFoundPage/> } />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
