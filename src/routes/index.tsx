import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Header from "../component/header";
import Content from "../component/content";
import Wishlist from "../component/wishlist";
import Summary from "../component/summary";
import Login from "../component/login";

export const BASE_CLIENT_URL = "";

const AllSeeingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

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
              <AllSeeingContainer>
                <Header />
                <Wishlist />
              </AllSeeingContainer>
            }
          />
          <Route
            path="login"
            element={
              <>
                <AllSeeingContainer>
                  <Header inLogin={true} />
                  <Login isLogin={true} />
                </AllSeeingContainer>
              </>
            }
          />
          <Route
            path="signin"
            element={
              <>
                <AllSeeingContainer>
                  <Header inLogin={true} />
                  <Login isLogin={false} />
                </AllSeeingContainer>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
