import { GlobalTransition } from "./GlobalComponent";

import { WishlistProvider } from "./component/context/WishlistContext";
import AppRoutes from "./routes";
import SelectedMovieProvider from "./component/context/SelectedMovieContext";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          if (error?.response?.status === 401) {
            return false;
          }
          return failureCount < 5;
        },
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WishlistProvider>
          <SelectedMovieProvider>
            <GlobalTransition />
            <AppRoutes />
          </SelectedMovieProvider>
        </WishlistProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
