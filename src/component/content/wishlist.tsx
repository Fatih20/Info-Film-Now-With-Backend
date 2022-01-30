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
  padding: 1.25rem;
`;

const Title = styled.h2`
  color: #fafafa;
  font-size: 2rem;
  margin-bottom: 1.25rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 3rem;
  }
`;

const WishlistContainer = styled.div`
  /* border: solid 1px white; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  max-width: 1080px;

  & > * {
    width: 100%;
  }
  @media (min-width: 600px) {
    padding: 1.25rem;
  }
`;

const WishlistObject = styled.div`
  align-items: center;
  background-color: #333333;
  border: solid 2px #666666;
  border-radius: 0.5rem;
  box-sizing: border-box;
  display: flex;
  gap: 1.25rem;
  padding: 1rem;
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
    font-size: 1.25rem;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const DeleteButton = styled(VanillaButton)`
  background-color: rgba(0, 0, 0, 0);
  color: #fafafa;
  font-size: 1.25rem;
  margin-right: 1.25rem;
  visibility: visible;

  &:hover {
    color: #ed5353;
  }

  @media (min-width: 900px) {
    ${WishlistObject}:hover & {
      visibility: visible;
    }
    font-size: 2rem;
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
