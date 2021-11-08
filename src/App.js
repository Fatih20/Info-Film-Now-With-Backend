import Header from './component/header/header';
import Content from './component/content/content';

import { GlobalTransition } from './GlobalComponent';

function App() {
  return (
    <>
      <GlobalTransition />
      <Header />
      <Content />
    </>
  );
}

export default App;
