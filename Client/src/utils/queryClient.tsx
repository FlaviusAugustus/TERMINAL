import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toastNotify } from "./toast.utils.tsx";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toastNotify.error(errorMessage);
    },
  }),
});
