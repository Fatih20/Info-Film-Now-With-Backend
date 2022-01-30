import styled from "styled-components";

import { IMAGE_URL } from "../../config";
import { BackButton } from "../../GlobalComponent";

import { useNavigate } from "react-router";
import { useSelectedMovieContext } from "../context/SelectedMovieContext";
import { BASE_CLIENT_URL } from "../../routes";
import { useUserPositionInList } from "../context/PositionInListContext";

const Main = styled.div`
  display: flex;
  padding-bottom: 1.25rem;
  align-items: center;
  flex-direction: column;
  @media (min-width: 900px) {
    align-items: initial;
    flex-direction: row;
  }
`;

const DescriptionContainer = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  padding: 0;

  @media (min-width: 900px) {
    padding-left: 1.25rem;
  }
`;

const MovieTitle = styled.h2`
  font-size: 2.25rem;
  text-align: center;
  @media (min-width: 600px) {
    font-size: 3rem;
  }
  @media (min-width: 900px) {
    font-size: 4rem;
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

  @media (min-width: 600px) {
    font-size: 1.25rem;
    text-align: initial;
  }
`;

const MoviePoster = styled.img`
  margin-bottom: 1.25rem;
  max-width: 300px;
  width: 100%;
  @media (min-width: 900px) {
    margin-bottom: 0;
    max-width: none;
    width: initial;
  }
`;

function Summary() {
  const { selectedMovie } = useSelectedMovieContext();
  function backToList() {
    navigate(`${BASE_CLIENT_URL}`);
  }
  const navigate = useNavigate();
  const { title, release_date, overview, poster_path } = selectedMovie;
  return (
    <Main>
      <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
      <DescriptionContainer>
        <MovieTitle>{title}</MovieTitle>
        <MovieDate>({release_date.slice(0, 4)})</MovieDate>
        <MovieOverview>{overview}</MovieOverview>
      </DescriptionContainer>
      <BackButton onClick={backToList}>Return to The Movie List</BackButton>
    </Main>
  );
}

export default Summary;
