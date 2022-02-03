import styled from "styled-components";
import { useNavigate } from "react-router";
import { BASE_CLIENT_URL } from "../routes";
import { locationName, movies } from "../utils/types";
import { useBackLocation } from "./context/BackLocationContext";
import { useUserPositionInList } from "./context/PositionInListContext";
import { useSelectedMovieContext } from "./context/SelectedMovieContext";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "./context/WishlistContext";
import { VanillaButton } from "../GlobalComponent";
import { useState } from "react";

interface IShowUnderCondition {
  show: boolean;
}

const Main = styled.div`
  background-color: #333333;
  /* border: solid 2px #666666; */
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 5px 7px rgba(0, 0, 0, 0.4));
  gap: 1.25rem;
  justify-content: center;
  padding: 1rem;
`;

const MoviePoster = styled.img`
  height: 125px;
  @media (min-width: 600px) {
    height: 150px;
  }
`;

const MovieTitle = styled.h2`
  color: #fafafa;
  font-size: 1.25rem;
  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

const MovieYear = styled.p``;

const MovieTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MovieActionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const DeleteButton = styled(VanillaButton)<IShowUnderCondition>`
  align-self: center;
  background-color: #e50914;
  border-radius: 0.25rem;
  color: #fafafa;
  display: ${({ show }) => (show ? "initial" : "none")};
  margin-right: 1.25rem;
  transition: color 0.2s, background-color 0.2s;
  visibility: visible;
  padding: 0.25rem;

  &:hover {
    background-color: #a10705;
    color: #fafafa;
  }

  /* & > * {
    color: black;
    transition: color 0.2s, background-color 0.2s;
    transition-delay: 0s;
    transition-timing-function: linear;
  }

  @media (min-width: 900px) {
    ${Main}:hover & {
      visibility: visible;
    }
    font-size: 2rem;
    visibility: hidden;
  } */
`;

const Summary = styled.div<IShowUnderCondition>`
  display: ${({ show }) => (show ? "inline-block" : "none")};
`;

function MovieShortened({
  movie,
  isAdd,
  backLocationName,
}: {
  movie: movies;
  isAdd: boolean;
  backLocationName: locationName;
}) {
  const [showSummary, setShowSummary] = useState(false);
  const { setSelectedMovie } = useSelectedMovieContext();
  const addToWishlist = useAddToWishlist();
  const { setBackLocation } = useBackLocation();
  const removeFromWishlist = useRemoveFromWishlist();
  const { title, release_date, overview } = movie;
  const navigate = useNavigate();
  const { saveUserPosition } = useUserPositionInList();

  function changeToSummary(movie: movies) {
    saveUserPosition();
    setSelectedMovie(movie);
    setBackLocation(backLocationName);
    navigate(`${BASE_CLIENT_URL}/summary`);
    window.scrollTo(0, 0);
  }

  function addOrRemoveFromWishlist() {
    if (isAdd) {
      return () => addToWishlist(movie);
    } else {
      return () => removeFromWishlist(movie);
    }
  }

  return (
    <Main onClick={() => setShowSummary((prevShowSummary) => !prevShowSummary)}>
      <MovieTextContainer>
        <MovieTitle>{title}</MovieTitle>
        <MovieYear>{release_date.slice(0, 4)}</MovieYear>
      </MovieTextContainer>
      <Summary show={showSummary}>{overview}</Summary>
      <DeleteButton show={showSummary} onClick={addOrRemoveFromWishlist()}>
        Remove from Wishlist
      </DeleteButton>

      {/* <Spacer /> */}
      {/* <MovieActionContainer></MovieActionContainer> */}
      {/* 
      <Spacer />
      <WishlistButton onClick={addOrRemoveFromWishlist()}>
        {isAdd ? "Add to" : "Remove from"} Wishlist
      </WishlistButton>
      <SummaryButton onClick={() => changeToSummary(movie)}>
        About the Movie
      </SummaryButton> */}
    </Main>
  );
}

export default MovieShortened;
