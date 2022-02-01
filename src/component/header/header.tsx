import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import TMDBLogo from "../../TMDBLogo.svg";
import { VanillaButton } from "../../GlobalComponent";

const Main = styled.div`
  background-color: black;
  color: #fafafa;
  display: grid;
  font-size: 1rem;
  grid-template-columns: auto 4rem;
  grid-template-rows: 1fr;
  padding: 1.25rem;

  /* border: solid 1px white; */

  & > * {
    text-align: left;
    @media (min-width: 600px) {
      text-align: center;
    }
    /* display: inline-block; */
  }

  @media (min-width: 600px) {
    grid-template-columns: 4rem auto 4rem;
    font-size: 1.25rem;
  }
`;

const SignInButton = styled.div`
  /* background-color: rgba(0, 0, 0, 0); */
  align-items: center;
  color: #4d4d4d;
  cursor: pointer;
  display: flex;
  font-size: 2.5em;
  grid-column: 2/3;
  grid-row: 1/2;
  justify-content: center;
  padding: 0;
  /* transition: color 0.2s, background-color 0.2s; */

  & > * {
    background-color: none;
    /* transition: color 0.2s, background-color 0.2s; */
  }

  &:hover {
    color: #fafafa;
  }

  @media (min-width: 600px) {
    grid-column: 3/4;
    font-size: 2em;
  }

  /* border: solid 1px white; */
`;

const TitleContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
  grid-column: 1/2;
  grid-row: 1/2;

  @media (min-width: 600px) {
    align-items: center;
    grid-column: 2/3;
  }

  /* border: solid 1px white; */
`;

const Logo = styled.img`
  margin-top: 0.5rem;
  max-width: 150px;
  height: 1em;
  width: auto;
`;

const Title = styled.h1``;

function Header() {
  const isLoggedIn = false;
  return (
    <Main>
      <TitleContainer>
        <Title>Info Film</Title>
        <Logo src={TMDBLogo} />
      </TitleContainer>
      <SignInButton>
        <FontAwesomeIcon
          icon={isLoggedIn ? faSignOutAlt : faSignInAlt}
          // rotation={isLoggedIn ? 90 : 0}
          rotation={isLoggedIn ? 180 : undefined}
        />
      </SignInButton>
    </Main>
  );
}

export default Header;
