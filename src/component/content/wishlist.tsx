import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { useWishlist, useRemoveFromWishlist } from "../context/WishlistContext";

import { IMAGE_URL } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VanillaButton, BackButtonArrow } from "../../GlobalComponent";
import { movies } from "../../utils/types";
import { useNavigate } from "react-router";

const Main = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #fafafa;
  font-size: 45px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 35px;
  }
`;

const WishlistContainer = styled.div`
  /* border: solid 1px white; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  max-width: 1080px;

  & > * {
    width: 100%;
  }

  @media (max-width: 900px) {
    padding: 20px;
  }

  @media (max-width: 500px) {
    padding: 0;
  }
`;

const WishlistObject = styled.div`
  align-items: center;
  background-color: #333333;
  border: solid 2px #666666;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  padding: 15px;
`;

const MoviePoster = styled.img`
  height: 150px;

  @media (max-width: 500px) {
    height: 125px;
  }
`;

const MovieTitle = styled.h2`
  color: #fafafa;

  @media (max-width: 500px) {
    font-size: 20px;
  }

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const DeleteButton = styled(VanillaButton)`
  background-color: rgba(0, 0, 0, 0);
  font-size: 30px;
  color: #fafafa;
  visibility: hidden;
  margin-right: 20px;

  &:hover {
    color: #ed5353;
  }

  @media (min-width: 901px) {
    ${WishlistObject}:hover & {
      visibility: visible;
    }
  }

  @media (max-width: 900px) {
    font-size: 20px;
    visibility: visible;
  }
`;

function Wishlist() {
  const wishlist = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const navigate = useNavigate();

  function wishlistObjectGenerator(movie: movies) {
    const { poster_path, title, release_date } = movie;
    return (
      <WishlistObject>
        <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
        <MovieTitle>{`${title} (${release_date.slice(0, 4)})`}</MovieTitle>
        <Spacer />
        <DeleteButton onClick={() => removeFromWishlist(movie)}>
          <FontAwesomeIcon icon="trash" />
        </DeleteButton>
      </WishlistObject>
    );
  }

  return (
    <Main>
      <Title>Your Wishlist</Title>
      <WishlistContainer>
        {wishlist.map(wishlistObjectGenerator)}
      </WishlistContainer>
      <BackButtonArrow onClick={() => navigate("/")}>
        <FontAwesomeIcon icon="arrow-left" />
      </BackButtonArrow>
    </Main>
  );
}

export default Wishlist;
