import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../component/header/header";
import Content from "../component/content/content";
import Wishlist from "../component/content/wishlist";
import Summary from "../component/content/summary";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <>
                <Header />
                <Content />
              </>
            }
          />
          <Route
            path="summary"
            element={
              <>
                <Header />
                <Summary />
              </>
            }
          />
          <Route
            path="wishlist"
            element={
              <>
                <Header />
                <Wishlist />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
