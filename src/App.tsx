import Header from "./component/header/header";
import Content from "./component/content/content";

import { GlobalTransition } from "./GlobalComponent";

import { WishlistProvider } from "./component/context/WishlistContext";
import AppRoutes from "./routes";
import SelectedMovieProvider from "./component/context/SelectedMovieContext";

function App() {
  return (
    <>
      <WishlistProvider>
        <SelectedMovieProvider>
          <GlobalTransition />
          <AppRoutes />
        </SelectedMovieProvider>
      </WishlistProvider>
    </>
  );
}

export default App;
