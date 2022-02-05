import styled from "styled-components";

import { IMAGE_URL } from "../config";
import { VanillaButton } from "../GlobalComponent";
import { useSelectedMovieContext } from "./context/SelectedMovieContext";
import { locationName, movies } from "../utils/types";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "./context/WishlistContext";
import { useNavigate } from "react-router";
import { useUserPositionInList } from "./context/PositionInListContext";
import { BASE_CLIENT_URL } from "../routes";
import { useBackLocation } from "./context/BackLocationContext";
import useNotFirstEffect from "../customHooks/useNotFirstEffect";
import { useEffect, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IWishlistButtonProps {
  isAdd: boolean;
}

const Main = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 1.25rem 0;
  position: relative;
  text-align: center;
  width: 100%;

  /* border: solid 1px white; */
`;

const MovieTitle = styled.h2`
  font-weight: 700;
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const MoviePoster = styled.img`
  width: 100%;
`;

const MovieYear = styled.p``;

const ImageContainer = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  ${ImageContainer}:hover & {
    background-color: rgba(0, 0, 0, 0.25);
  }

  @media (min-width: 900px) {
    display: initial;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const ButtonContainerLargeScreen = styled(ButtonContainer)`
  display: none;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  & > button {
    font-size: 2rem;
  }

  @media (min-width: 900px) {
    ${ImageContainer}:hover & {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
`;

const ButtonContainerSmallScreen = styled(ButtonContainer)`
  display: flex;

  @media (min-width: 900px) {
    display: none;
  }

  /* border: solid 1px white; */
`;

const MovieButton = styled(VanillaButton)`
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 50%;

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }
`;

/* display: ${({ show }) => (show ? "initial" : "none")}; */
const WishlistButton = styled(VanillaButton)<IWishlistButtonProps>`
  /* background-color: ${({ isAdd }) => (isAdd ? "#00b0e6" : "#e50914")}; */
  background-color: rgba(0, 0, 0, 0);
  color: #fafafa;
  /* font-size: 2rem; */

  transition: all 0.2s;

  &:hover {
    /* background-color: ${({ isAdd }) => (isAdd ? "#008db8" : "#b70710")}; */
    color: #fafafa;
  }

  /* border: solid 1px white; */
`;

const SummaryButton = styled(VanillaButton)`
  background-color: rgba(0, 0, 0, 0);
  color: #fafafa;
  &:hover {
    color: white;
  }
  /* border: solid 1px white; */
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Movie({
  movie,
  isAdd,
  backLocationName,
}: {
  movie: movies;
  isAdd: boolean;
  backLocationName: locationName;
}) {
  const [wishlist, timesWishlistChanged] = useWishlist();
  const { setSelectedMovie } = useSelectedMovieContext();
  const addToWishlist = useAddToWishlist();
  const { setBackLocation } = useBackLocation();
  const removeFromWishlist = useRemoveFromWishlist();
  const { poster_path, title, release_date } = movie;
  const navigate = useNavigate();
  const { saveUserPosition } = useUserPositionInList();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(checkIfIsInWishlist());
  }, [wishlist]);

  function changeToSummary(movie: movies) {
    saveUserPosition();
    setSelectedMovie(movie);
    setBackLocation(backLocationName);
    navigate(`${BASE_CLIENT_URL}/summary`);
    window.scrollTo(0, 0);
  }

  function addOrRemoveFromWishlist(whetherToAddOrRemove: boolean) {
    if (whetherToAddOrRemove) {
      return () => addToWishlist(movie);
    } else {
      return () => removeFromWishlist(movie);
    }
  }

  function checkIfIsInWishlist() {
    if (
      wishlist.filter((wishlistMovie) => movie.title === wishlistMovie.title)
        .length === 0
    ) {
      // console.log(movie.title);
      // console.log(wishlist);
      // console.log(
      //   wishlist.filter((wishlistMovie) => movie.id === wishlistMovie.id)
      // );
      return false;
    } else {
      return true;
    }
  }

  return (
    <Main>
      <ImageContainer>
        <Overlay />
        <ButtonContainerLargeScreen>
          <SummaryButton onClick={() => changeToSummary(movie)}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </SummaryButton>
          <Spacer />
          <WishlistButton
            onClick={addOrRemoveFromWishlist(!isInWishlist)}
            isAdd={isAdd}
            // show={!isInWishlist}
          >
            {isInWishlist ? (
              <FontAwesomeIcon icon={["fas", "star"]} />
            ) : (
              <FontAwesomeIcon icon={["far", "star"]} />
            )}
          </WishlistButton>
        </ButtonContainerLargeScreen>
        <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
      </ImageContainer>
      <MovieTitle>{title}</MovieTitle>
      <MovieYear>{release_date.slice(0, 4)}</MovieYear>
      {/* <Spacer /> */}
      {/* <ButtonContainerSmallScreen>
        <WishlistButton
          onClick={addOrRemoveFromWishlist()}
          isAdd={isAdd}
          show={!isInWishlist}
        >
          {isAdd ? "Add to" : "Remove from"} Wishlist
        </WishlistButton>
        <SummaryButton onClick={() => changeToSummary(movie)}>
          About the Movie
        </SummaryButton>
      </ButtonContainerSmallScreen> */}
    </Main>
  );
}

export default Movie;
