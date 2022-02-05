import styled from "styled-components";
import { useState } from "react";
import { movies } from "../utils/types";
import { useSelectedMovieContext } from "./context/SelectedMovieContext";
import { IMAGE_URL } from "../config";
import { BackButton } from "../GlobalComponent";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMainProps {
  show: boolean;
}

const Main = styled.div<IMainProps>`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  left: 0;
  overflow: auto;
  position: fixed;
  padding: 1.25rem;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;

  @media (min-width: 900px) {
    justify-content: center;
  }
`;

const SummaryContainer = styled.div`
  align-items: center;
  background-color: #1a1a1a;
  border-radius: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  width: fit-content;
  @media (min-width: 900px) {
    padding: 1.5rem;
  }
`;

const CloseButtonExcluded = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 900px) {
    align-items: initial;
    flex-direction: row;
  }
`;

const DescriptionContainer = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 0.5rem;
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

const SecondTextContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto;
  font-size: 1.25rem;
  @media (min-width: 900px) {
    margin: initial;
  }
`;

const MovieDate = styled.p`
  text-align: center;
  @media (min-width: 900px) {
    text-align: initial;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MovieOverview = styled.p`
  border-top: solid 2px #fafafa;
  padding-top: 0.5rem;
  line-height: 1.4;
  /* margin: 1rem 0; */
  font-size: 1rem;
  text-align: center;

  @media (min-width: 900px) {
    font-size: 1.25rem;
    text-align: initial;
  }
`;

const MoviePoster = styled.img`
  /* margin-bottom: 1.25rem; */
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
    selectedMovie: { title, release_date, overview, poster_path, vote_average },
  } = useSelectedMovieContext();
  return (
    <Main onClick={closerFunction} show={show}>
      <SummaryContainer>
        <CloseButtonExcluded>
          <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
          <DescriptionContainer>
            <MovieTitle>{title}</MovieTitle>
            <SecondTextContainer>
              <MovieDate>({release_date.slice(0, 4)})</MovieDate>
              <RatingContainer>
                {vote_average}
                <FontAwesomeIcon icon={faStar} color="#00b0e6" />
              </RatingContainer>
            </SecondTextContainer>
            <MovieOverview>{overview}</MovieOverview>
          </DescriptionContainer>
        </CloseButtonExcluded>
        <BackButton onClick={closerFunction}>Close summary</BackButton>
      </SummaryContainer>
    </Main>
  );
}
