import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "../component/header/header";
import Content from "../component/content/content";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
