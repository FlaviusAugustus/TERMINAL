import { QueryClient, QueryCache } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { toastNotify } from "./toast.utils.tsx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnReconnect: true,
    },
    mutations: {
      networkMode: "offlineFirst",
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});
