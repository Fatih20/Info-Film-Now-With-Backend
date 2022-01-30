import Header from "./component/header/header";
import Content from "./component/content/content";

import { GlobalTransition } from "./GlobalComponent";

import { WishlistProvider } from "./component/context/WishlistContext";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <WishlistProvider>
        <GlobalTransition />
        <AppRoutes />
      </WishlistProvider>
    </>
  );
}

export default App;
