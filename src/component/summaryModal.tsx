import styled from "styled-components";
import { useState } from "react";
import { movies } from "../utils/types";
import { useSelectedMovieContext } from "./context/SelectedMovieContext";

interface IMainProps {
  show: boolean;
}

const Main = styled.div<IMainProps>`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  flex-direction: column;
  left: 0;
  justify-content: center;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
`;

const SummaryContainer = styled.div`
  background-color: yellow;
  height: 50px;
  width: 50px;
`;

export default function SummaryWindow({
  show,
  closerFunction,
}: {
  show: boolean;
  closerFunction: () => void;
}) {
  const { selectedMovie } = useSelectedMovieContext();
  return (
    <Main onClick={closerFunction} show={show}>
      <SummaryContainer></SummaryContainer>
    </Main>
  );
}
