import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

import Movie from "./movie";
import Summary from "./summary";
import Wishlist from "./wishlist";

import { VanillaButton } from "../../GlobalComponent";

import { useAddToWishlist } from "../context/WishlistContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePopularMovie from "../../customHooks/usePopularMovie";
import { movies } from "../../utils/types";

type typeOfContentType = "list" | "wishlist" | "summary";

interface IMainProps {
  typeOfContent: typeOfContentType;
}

const MainIsList = css`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
`;

const MainIsSummary = css`
  flex-direction: column;
`;

const Main = styled.div<IMainProps>`
  background-color: #1a1a1a;
  display: flex;
  padding: 20px;
  ${({ typeOfContent }) => {
    if (typeOfContent === "list" || typeOfContent === "wishlist") {
      return MainIsList;
    } else {
      return MainIsSummary;
    }
  }};

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

const BackButton = styled(VanillaButton)`
  border-radius: 5px;
  display: block;
  font-size: 15px;
  margin: 20px auto 0 auto;
  padding: 10px 15px;

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }

  & > * {
    vertical-align: middle;
  }
`;

const BackButtonArrow = styled(VanillaButton)`
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
  const [typeOfContent, setTypeOfContent] = useState(
    "list" as typeOfContentType
  );
  const examinedMovie = useRef({
    poster_path: "",
    title: "",
    overview: "",
    release_date: "",
  } as movies);
  const userPositionInList = useRef({ positionX: 0, positionY: 0 });

  const addToWishlist = useAddToWishlist();

  async function getMovieList() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    const movieData = data.results;
    return movieData;
  }

  useEffect(() => {
    if (typeOfContent === "list") {
      window.scrollTo(
        userPositionInList.current.positionX,
        userPositionInList.current.positionY
      );
    } else if (typeOfContent === "summary") {
      window.scrollTo(0, 0);
    }
  }, [typeOfContent]);

  function changeToSummary(movie: movies) {
    userPositionInList.current = {
      positionX: window.scrollX,
      positionY: window.scrollY,
    };
    examinedMovie.current = movie;
    setTypeOfContent("summary");
  }

  function changeToList() {
    setTypeOfContent("list");
  }

  function changeToWishlist() {
    userPositionInList.current = {
      positionX: window.scrollX,
      positionY: window.scrollY,
    };
    setTypeOfContent("wishlist");
  }

  function movieMaker(movie: movies) {
    return (
      <Movie
        key={movie.poster_path}
        movie={movie}
        changeToSummary={() => changeToSummary(movie)}
        addToWishlist={() => addToWishlist(movie)}
      />
    );
  }

  if (typeOfContent === "list") {
    return (
      <>
        <WishlistButton onClick={changeToWishlist}>
          <FontAwesomeIcon icon="shopping-cart" />
        </WishlistButton>
        <Main typeOfContent={typeOfContent}>
          {popularMovieList.map(movieMaker)}
        </Main>
      </>
    );
  } else if (typeOfContent === "summary") {
    return (
      <Main typeOfContent={typeOfContent}>
        <ExplanationContainer>
          <Summary movie={examinedMovie.current} />
          <BackButton onClick={changeToList}>
            Return to The Movie List
          </BackButton>
        </ExplanationContainer>
      </Main>
    );
  } else if (typeOfContent === "wishlist") {
    return (
      <>
        <Wishlist />
        <BackButtonArrow onClick={changeToList}>
          <FontAwesomeIcon icon="arrow-left" />
        </BackButtonArrow>
      </>
    );
  } else {
    return <></>;
  }
}

export default Content;