import Header from './component/header/header';
import Content from './component/content/content';

import { GlobalTransition } from './GlobalComponent';

import { WishlistProvider } from './component/context/WishlistContext';

function App() {
  return (
    <>
      <WishlistProvider>
        <GlobalTransition />
        <Header />
        <Content />
      </WishlistProvider>
      
    </>
  );
}

export default App;
