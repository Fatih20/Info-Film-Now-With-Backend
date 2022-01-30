import styled, { css } from "styled-components";

import Movie from "./movie";
import { VanillaButton } from "../../GlobalComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePopularMovie from "../../customHooks/usePopularMovie";
import { movies } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { BASE_CLIENT_URL } from "../../routes";
import { useUserPositionInList } from "../context/PositionInListContext";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const MainIsList = css`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
`;

const MainIsSummary = css`
  flex-direction: column;
`;

const Main = styled.div`
  background-color: #1a1a1a;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
  padding: 20px;

  @media (max-width: 400px) {
    padding: 20px 5px;
  }
`;

const ExplanationContainer = styled.div`
  border-bottom: #fafafa 1px solid;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1280px;
  padding: 10px 10px 50px 10px;

  @media (max-width: 900px) {
    border: none;
  }
`;

const WishlistButton = styled(VanillaButton)`
  background-color: #fafafa;
  border-radius: 50%;
  bottom: 20px;
  color: #4e4e4e;
  font-size: 32px;
  height: 75px;
  left: 20px;
  position: fixed;
  width: 75px;
  z-index: 10;

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }

  & > * {
    vertical-align: middle;
  }
`;

function Content() {
  const { popularMovieList, error } = usePopularMovie();
  const navigate = useNavigate();
  const { saveUserPosition, restoreUserPosition } = useUserPositionInList();

  useEffect(() => {
    restoreUserPosition();
  }, []);

  function goToWishlist() {
    saveUserPosition();
    navigate(`${BASE_CLIENT_URL}/wishlist`);
  }

  function movieMaker(movie: movies) {
    return <Movie key={movie.poster_path} movie={movie} />;
  }

  return (
    <>
      <WishlistButton onClick={goToWishlist}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </WishlistButton>
      <Main>{popularMovieList.map(movieMaker)}</Main>
    </>
  );
}

export default Content;
