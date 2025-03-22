import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/RegisterPage";
import SamplesPage from "./pages/SamplesPage";
import NewProjectForm from "./components/Shared/Forms/NewProjectForm";
import AuthorizedLayout from "./pages/layouts/AuthorizedLayout";
import NoNavbarLayout from "./pages/layouts/NoNavbarLayout";
import { toastOptions } from "./utils/toast.utils.tsx";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthorizedLayout />}>
                        <Route path="/samples" element={<SamplesPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/add-new-project" element={<NewProjectForm />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route element={<NoNavbarLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster toastOptions={toastOptions} />
        </QueryClientProvider>
    );
}
