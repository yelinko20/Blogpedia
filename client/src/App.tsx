import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ErrorBoundary } from "react-error-boundary";

import SuspenseFallback from "@/components/SuspenseFallback";
// import FallBackComponent from "@/error/FallBackComponent";
import { ThemeProvider } from "@/context/ThemeProvider";
import { UserContextProvider } from "@/context/UserContextProvider";
import { store } from "@/redux/store";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 24,
    },
  },
});

export default function App() {
  return (
    // <ErrorBoundary
    //   FallbackComponent={<FallBackComponent />}
    //   onReset={() => navigate("/")}
    // >
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContextProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            <Suspense fallback={<SuspenseFallback />}>
              <RouterProvider router={router} />
            </Suspense>
          </ThemeProvider>
        </UserContextProvider>
      </Provider>
    </QueryClientProvider>
    // </ErrorBoundary>
  );
}
