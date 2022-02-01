import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../component/header/header";
import Content from "../component/content/content";
import Wishlist from "../component/wishlist";
import Summary from "../component/summary";

export const BASE_CLIENT_URL = "";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${BASE_CLIENT_URL}`}>
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
          <Route
            path="login"
            element={
              <>
                <Header />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
