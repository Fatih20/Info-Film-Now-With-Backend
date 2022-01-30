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

const Main = styled.div`
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  row-gap: 2rem;
  justify-items: center;
  padding: 1rem 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1280px;
  padding: 10px 10px 50px 10px;

  border: none;
  @media (min-width: 900px) {
    border-bottom: #fafafa 1px solid;
  }
`;

const WishlistButton = styled(VanillaButton)`
  background-color: #fafafa;
  border-radius: 50%;
  bottom: 1.25rem;
  color: #4e4e4e;
  font-size: 2rem;
  height: 4.5rem;
  left: 1.25rem;
  position: fixed;
  width: 4.5rem;
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
