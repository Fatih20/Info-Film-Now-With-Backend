import { GlobalTransition } from "./GlobalComponent";

import { WishlistProvider } from "./component/context/WishlistContext";
import AppRoutes from "./routes";
import SelectedMovieProvider from "./component/context/SelectedMovieContext";
import UserPositionInListProvider from "./component/context/PositionInListContext";
import { QueryClientProvider, QueryClient } from "react-query";
import BackLocationProvider from "./component/context/BackLocationContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

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
        <UserPositionInListProvider>
          <BackLocationProvider>
            <WishlistProvider>
              <SelectedMovieProvider>
                <GlobalTransition />
                <AppRoutes />
              </SelectedMovieProvider>
            </WishlistProvider>
          </BackLocationProvider>
        </UserPositionInListProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
