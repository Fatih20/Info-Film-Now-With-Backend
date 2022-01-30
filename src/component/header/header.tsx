import React from "react";
import styled from "styled-components";

import TMDBLogo from "../../TMDBLogo.svg";

const Main = styled.div`
  background-color: black;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;

  & > * {
    /* display: inline-block; */
    text-align: center;
  }
`;

const Logo = styled.img`
  margin-top: 0.5rem;
  max-width: 150px;
`;

const Title = styled.h1``;

function Header() {
  return (
    <Main>
      <Title>Cinema's Most Popular</Title>
      <Logo src={TMDBLogo} />
    </Main>
  );
}

export default Header;
