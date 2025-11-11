import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import LoginPage from "@pages/LoginPage";
import AddProject from "@pages/AddProject.tsx";
import AuthorizedLayout from "@pages/layouts/AuthorizedLayout";
import NoNavbarLayout from "@pages/layouts/NoNavbarLayout";
import { toastOptions } from "@utils/toast.utils.tsx";
import ProjectsPage from "@pages/ProjectsPage.tsx";
import RecipesPage from "@pages/RecipesPage.tsx";
import ProcessPage from "@pages/ProcessPage.tsx";
import UsersPage from "@pages/UsersPage.tsx";
import AddRecipeWithContexts from "@pages/AddRecipe.tsx";
import DashboardPage from "@pages/DashboardPage.tsx";
import LoginOrNotFound from "@pages/LoginOrNotFound.tsx";
import ParametersPage from "@pages/ParametersPage.tsx";
import AddParameter from "@pages/AddParameter.tsx";
import TagsPage from "@pages/TagsPage.tsx";
import AddTag from "@pages/AddTag.tsx";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persister, queryClient } from "@utils/queryClient";
import useIsOnline, { OnlineStatusProvider } from "@hooks/useIsOnline";
import AddSampleWithContexts from "@pages/AddProcess.tsx";

const App = () => {
  return (
    <>
      <Toaster toastOptions={toastOptions} />
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: persister,
        }}
      >
        <OnlineStatusProvider>
          <Router />
        </OnlineStatusProvider>
      </PersistQueryClientProvider>
    </>
  );
};

export function Router() {
  const online = useIsOnline();
  return (
    <BrowserRouter>
      <Routes>
        {online && (
          <>
            <Route element={<AuthorizedLayout pageName="Add new recipe" />}>
              <Route path="/new-recipe" element={<AddRecipeWithContexts />} />
            </Route>
            <Route element={<AuthorizedLayout pageName="Add new project" />}>
              <Route path="/new-project" element={<AddProject />} />
            </Route>
            <Route element={<AuthorizedLayout pageName="Add new process" />}>
              <Route path="/new-process" element={<AddSampleWithContexts />} />
            </Route>
            <Route element={<AuthorizedLayout pageName="Add new parameter" />}>
              <Route path="/new-parameter" element={<AddParameter />} />
            </Route>
            <Route element={<AuthorizedLayout pageName="Add new tag" />}>
              <Route path="/new-tag" element={<AddTag />} />
            </Route>
          </>
        )}
        <Route element={<AuthorizedLayout pageName="Dashboard" />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
        <Route element={<AuthorizedLayout pageName="Projects" />}>
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
        <Route element={<AuthorizedLayout pageName="Tags" />}>
          <Route path="/tags" element={<TagsPage />} />
        </Route>
        <Route element={<AuthorizedLayout pageName="Recipes" />}>
          <Route path="/recipes" element={<RecipesPage />} />
        </Route>
        <Route element={<AuthorizedLayout pageName="Processes" />}>
          <Route path="/processes" element={<ProcessPage />} />
        </Route>
        <Route element={<AuthorizedLayout pageName="Parameters" />}>
          <Route path="/parameters" element={<ParametersPage />} />
        </Route>
        <Route
          element={
            <AuthorizedLayout
              pageName="Users"
              roles={["Administrator", "Moderator"]}
            />
          }
        >
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route element={<NoNavbarLayout />}>
          <Route path="*" element={<LoginOrNotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
