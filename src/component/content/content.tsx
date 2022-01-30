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
import { blankMovie, movies } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { BASE_CLIENT_URL } from "../../routes";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
  const examinedMovie = useRef(blankMovie as movies);
  const userPositionInList = useRef({ positionX: 0, positionY: 0 });
  const navigate = useNavigate();
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
    return <Movie key={movie.poster_path} movie={movie} />;
  }

  return (
    <>
      <WishlistButton onClick={() => navigate(`${BASE_CLIENT_URL}/wishlist`)}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </WishlistButton>
      <Main typeOfContent={typeOfContent}>
        {popularMovieList.map(movieMaker)}
      </Main>
    </>
  );
}

export default Content;
