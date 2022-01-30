import styled from "styled-components";

import { useWishlist, useRemoveFromWishlist } from "../context/WishlistContext";

import { IMAGE_URL } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VanillaButton, BackButtonArrow } from "../../GlobalComponent";
import { movies } from "../../utils/types";
import { useNavigate } from "react-router";
import { BASE_CLIENT_URL } from "../../routes";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

const Main = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #fafafa;
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 45px;
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
  @media (min-width: 600px) {
    padding: 20px;
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
  height: 125px;
  @media (min-width: 600px) {
    height: 150px;
  }
`;

const MovieTitle = styled.h2`
  color: #fafafa;
  font-size: 16px;
  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const DeleteButton = styled(VanillaButton)`
  background-color: rgba(0, 0, 0, 0);
  color: #fafafa;
  font-size: 20px;
  margin-right: 20px;
  visibility: visible;

  &:hover {
    color: #ed5353;
  }

  @media (min-width: 900px) {
    ${WishlistObject}:hover & {
      visibility: visible;
    }
    font-size: 30px;
    visibility: hidden;
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
          <FontAwesomeIcon icon={faTrash} />
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
      <BackButtonArrow onClick={() => navigate(`${BASE_CLIENT_URL}`)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButtonArrow>
    </Main>
  );
}

export default Wishlist;
