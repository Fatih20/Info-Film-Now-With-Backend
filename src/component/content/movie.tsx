import styled from "styled-components";

import { IMAGE_URL } from "../../config";
import { VanillaButton } from "../../GlobalComponent";
import { useSelectedMovieContext } from "../context/SelectedMovieContext";
import { movies } from "../../utils/types";
import { useAddToWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router";
import { useUserPositionInList } from "../context/PositionInListContext";

const Main = styled.div`
  color: #fafafa;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 20px 0px;
  position: relative;
  text-align: center;
  width: 100%;

  /* border: solid 1px white; */
`;

const MovieTitle = styled.h2`
  font-weight: 700;
  font-size: 30px;
  margin-top: 15px;
  margin-bottom: 5px;
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
    background-color: rgba(0, 0, 0, 0.5);
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
  gap: 15px;
  padding: 10px;
  width: 100%;
`;

const ButtonContainerLargeScreen = styled(ButtonContainer)`
  display: none;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  @media (min-width: 900px) {
    ${ImageContainer}:hover & {
      display: flex;
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
  border-radius: 5px;
  padding: 7px;
  width: 50%;

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }
`;

const WishlistButton = styled(MovieButton)`
  background-color: #e50914;
  color: #fafafa;

  transition: all 0.2s;

  &:hover {
    background-color: #a10705;
    color: #fafafa;
  }
`;

const SummaryButton = styled(MovieButton)`
  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Movie({ movie }: { movie: movies }) {
  const { setSelectedMovie } = useSelectedMovieContext();
  const addToWishlist = useAddToWishlist();
  const { poster_path, title, release_date } = movie;
  const navigate = useNavigate();
  const { saveUserPosition } = useUserPositionInList();

  function changeToSummary(movie: movies) {
    saveUserPosition();
    setSelectedMovie(movie);
    navigate("summary");
    window.scrollTo(0, 0);
  }

  return (
    <Main>
      <ImageContainer>
        <Overlay />
        <ButtonContainerLargeScreen>
          <WishlistButton onClick={() => addToWishlist(movie)}>
            Add to Wishlist
          </WishlistButton>
          <SummaryButton onClick={() => changeToSummary(movie)}>
            About the Movie
          </SummaryButton>
        </ButtonContainerLargeScreen>
        <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
      </ImageContainer>
      <MovieTitle>{title}</MovieTitle>
      <MovieYear>{release_date.slice(0, 4)}</MovieYear>
      <Spacer />
      <ButtonContainerSmallScreen>
        <WishlistButton onClick={() => addToWishlist(movie)}>
          Add to Wishlist
        </WishlistButton>
        <SummaryButton onClick={() => changeToSummary(movie)}>
          About the Movie
        </SummaryButton>
      </ButtonContainerSmallScreen>
    </Main>
  );
}

export default Movie;
