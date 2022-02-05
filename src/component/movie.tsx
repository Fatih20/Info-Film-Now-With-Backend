import styled, { keyframes, css } from "styled-components";

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
  enlarge: boolean;
}

interface IActualProgressBarProps {
  width: number;
}

interface IProgressBarMainProps {
  showOnLarge: boolean;
}

const Main = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  /* margin-top: 1rem; */
  /* margin-bottom: 0.25rem; */
`;

const MoviePoster = styled.img`
  width: 100%;
`;

const MovieYear = styled.p``;

const ImageContainer = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  display: initial;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  ${ImageContainer}:hover & {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const InImageContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: none;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const InImageContainerLargeScreen = styled(InImageContainer)`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding-bottom: 0.75rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  @media (min-width: 900px) {
    display: none;
    ${ImageContainer}:hover & {
      display: flex;
      /* padding: 1rem; */
    }
  }
`;

const ButtonContainer = styled.div`
  align-self: start;
  box-sizing: border-box;
  flex-direction: row;
  width: 100%;
`;

const ButtonContainerLargeScreen = styled(ButtonContainer)`
  display: none;
  & > button {
    font-size: 2rem;
  }
  @media (min-width: 900px) {
    display: flex;
    padding: 0.75rem;
  }

  /* border: solid 1px white; */
`;

const ButtonContainerSmallScreen = styled(ButtonContainer)`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  display: flex;
  padding: 1rem 0.5rem 1rem 0.5rem;
  & > button {
    font-size: 1.5rem;
  }
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

const WishlistToggle = keyframes`
    0% {transform : scale(1)}
    50% {transform : scale(1.2)}
    100% {transform : scale(1)}
`;

const WishlistEnlarge = css`
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-name: ${WishlistToggle};
`;

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

  ${({ enlarge }) => {
    if (enlarge) {
      return WishlistEnlarge;
    }
  }}
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

const ProgressBarMain = styled.div<IProgressBarMainProps>`
  align-self: center;
  align-items: center;
  column-gap: 0.5rem;
  display: ${({ showOnLarge }) => (showOnLarge ? "none" : "flex")};
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  width: 80%;
  padding: 0 1rem;

  @media (min-width: 900px) {
    display: ${({ showOnLarge }) => (!showOnLarge ? "none" : "flex")};
  }
`;

const RatingText = styled.p`
  /* font-size: 0.5rem; */
  font-weight: bold;
`;

const ProgressBarBase = styled.div`
  background-color: #4d4d4d;
  border-radius: 1rem;
  height: 0.5rem;
  position: relative;
  width: 100%;
`;

const ActualProgressBar = styled.div<IActualProgressBarProps>`
  background-image: linear-gradient(to right, #67d8a2, #00b0e6);
  bottom: 0;
  border-radius: 1rem;
  left: 0;
  top: 0;
  position: absolute;
  width: ${({ width }) => `${width}%`};
`;

function ProgressBar({
  rating,
  showOnLarge,
}: {
  rating: number;
  showOnLarge: boolean;
}) {
  return (
    <ProgressBarMain showOnLarge={showOnLarge}>
      <ProgressBarBase>
        <ActualProgressBar width={rating * 10} />
      </ProgressBarBase>
      <RatingText>{rating} / 10</RatingText>
    </ProgressBarMain>
  );
}

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
  const { poster_path, title, release_date, vote_average } = movie;
  const navigate = useNavigate();
  const { saveUserPosition } = useUserPositionInList();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistClicked, setWishlistClicked] = useState(false);

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
        <InImageContainerLargeScreen>
          <ButtonContainerSmallScreen>
            <SummaryButton onClick={() => changeToSummary(movie)}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </SummaryButton>
            <Spacer />
            <WishlistButton
              onClick={addOrRemoveFromWishlist(!isInWishlist)}
              isAdd={isAdd}
              enlarge={wishlistClicked}
              // show={!isInWishlist}
            >
              {isInWishlist ? (
                <FontAwesomeIcon icon={["fas", "star"]} />
              ) : (
                <FontAwesomeIcon icon={["far", "star"]} />
              )}
            </WishlistButton>
          </ButtonContainerSmallScreen>
          <ButtonContainerLargeScreen>
            <SummaryButton onClick={() => changeToSummary(movie)}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </SummaryButton>
            <Spacer />
            <WishlistButton
              enlarge={wishlistClicked}
              onClick={() => {
                setWishlistClicked(true);
                setTimeout(() => {
                  setWishlistClicked(false);
                }, 500);
                addOrRemoveFromWishlist(!isInWishlist)();
              }}
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
          <Spacer />
          <ProgressBar showOnLarge={true} rating={vote_average} />
        </InImageContainerLargeScreen>
        <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
      </ImageContainer>
      <ProgressBar showOnLarge={false} rating={vote_average} />
      <MovieTitle>{title}</MovieTitle>
      <MovieYear>{release_date.slice(0, 4)}</MovieYear>
      {/* <p>{vote_average}</p> */}
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
