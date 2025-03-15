import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/RegisterPage";
import SamplesPage from "./pages/SamplesPage";
import NewProjectForm from "./components/Shared/Forms/NewProjectForm";
import React from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/add-new-project" element={<NewProjectForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
          toastOptions={{
              success: {
                  style: {
                      borderLeft: '4px solid #10B981'
                  },
              },
              error: {
                  style: {
                      borderLeft: '4px solid #EF4444',
                  },
              },
              loading: {
                  style: {
                      borderLeft: '4px solid #2563EB',
                  },
              },
          }}
      />
    </QueryClientProvider>
  );
}
