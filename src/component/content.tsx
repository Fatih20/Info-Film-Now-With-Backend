import { useState, useRef } from "react";
import useNotFirstEffect from "../customHooks/useNotFirstEffect";
import styled from "styled-components";

import Movie from "./movie";
import { VanillaButton } from "../GlobalComponent";
import { useWishlist } from "./context/WishlistContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePopularMovie from "../customHooks/usePopularMovie";
import { movies } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useUserPositionInList } from "./context/PositionInListContext";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

interface IShowUnderSomeCondition {
  show: boolean;
}

const Main = styled.div`
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  row-gap: 2rem;
  justify-items: center;
  padding: 1rem 1.5rem;
  /* position: relative; */

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

// const ExplanationContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto;
//   max-width: 1280px;
//   padding: 10px 10px 50px 10px;

//   border: none;
//   @media (min-width: 900px) {
//     border-bottom: #fafafa 1px solid;
//   }
// `;

const AbsoluteContainer = styled.div`
  align-items: center;
  bottom: 7.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 0;
  /* height: 100vh; */
  padding: 0.5rem;
  position: fixed;
  pointer-events: none;
  right: 0;
  top: 0;
  z-index: 12;

  /* border: solid 1px white; */
`;

const SuccessContainer = styled.div<IShowUnderSomeCondition>`
  background-color: #fafafa;
  border-radius: 0.75rem;
  /* border: solid 1px #333333; */
  color: #4e4e4e;
  filter: drop-shadow(0 5px 7px rgba(0, 0, 0, 0.4));
  transform: ${({ show }) =>
    show ? "scale(1) translateY(0)" : "scale(0) translateY(-10px)"};
  padding: 0.75rem;
  max-width: 300px;
  text-align: center;
  transition: transform 0.2s;
  transition-timing-function: ease-in-out;

  & > p {
    font-weight: 500;
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
  const [wishlist, timesWishlistChanged] = useWishlist();
  const { popularMovieList } = usePopularMovie();
  const { saveUserPosition, restoreUserPosition } = useUserPositionInList();
  const [justAdded, setJustAdded] = useState(false);
  const previousWishlist = useRef(wishlist);
  const navigate = useNavigate();

  useEffect(() => {
    restoreUserPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useNotFirstEffect(() => {
    if (timesWishlistChanged > 0) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1000);
    }
  }, [timesWishlistChanged]);

  function goToWishlist() {
    saveUserPosition();
    window.scrollTo(0, 0);
    navigate(`wishlist`);
  }

  function movieMaker(movie: movies) {
    return (
      <Movie
        key={movie.poster_path}
        forMain={true}
        movie={movie}
        backLocationName="Movie List"
      />
    );
  }

  return (
    <>
      <WishlistButton onClick={goToWishlist}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </WishlistButton>
      {/* <AbsoluteContainer>
        <SuccessContainer show={justAdded}>
          <p>Movie succesfully added to your wishlist!</p>
        </SuccessContainer>
      </AbsoluteContainer> */}
      <Main>{popularMovieList.map(movieMaker)}</Main>
    </>
  );
}

export default Content;
