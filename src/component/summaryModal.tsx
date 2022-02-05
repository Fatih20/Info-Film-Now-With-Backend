import styled from "styled-components";
import { useState } from "react";
import { movies } from "../utils/types";
import { useSelectedMovieContext } from "./context/SelectedMovieContext";
import { IMAGE_URL } from "../config";

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
  align-items: center;
  background-color: #1a1a1a;
  display: flex;
  width: 80%;
  padding: 1.25rem;
  flex-direction: column;

  @media (min-width: 900px) {
    padding: 1.5rem;
  }
`;

const DescriptionContainer = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 0;

  @media (min-width: 900px) {
    padding-left: 1.25rem;
  }
`;

const MovieTitle = styled.h2`
  font-size: 2.25rem;
  text-align: center;
  @media (min-width: 900px) {
    font-size: 3rem;
    text-align: initial;
  }
`;

const MovieDate = styled.p`
  font-size: 1.25rem;
  text-align: center;
  @media (min-width: 900px) {
    text-align: initial;
  }
`;

const MovieOverview = styled.p`
  line-height: 1.4;
  margin: 1rem 0;
  font-size: 1rem;
  text-align: center;

  @media (min-width: 900px) {
    font-size: 1.25rem;
    text-align: initial;
  }
`;

const MoviePoster = styled.img`
  margin-bottom: 1.25rem;
  /* max-width: none; */
  max-width: 300px;
  width: 100%;
  @media (min-width: 900px) {
    margin-bottom: 0;
    width: initial;
  }
`;

export default function SummaryWindow({
  show,
  closerFunction,
}: {
  show: boolean;
  closerFunction: () => void;
}) {
  const {
    selectedMovie: { title, release_date, overview, poster_path },
  } = useSelectedMovieContext();
  return (
    <Main onClick={closerFunction} show={show}>
      <SummaryContainer>
        <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
        <DescriptionContainer>
          <MovieTitle>{title}</MovieTitle>
          <MovieDate>({release_date.slice(0, 4)})</MovieDate>
          <MovieOverview>{overview}</MovieOverview>
        </DescriptionContainer>
      </SummaryContainer>
    </Main>
  );
}
