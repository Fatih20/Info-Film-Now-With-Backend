import styled from "styled-components";

import { useWishlist } from "./context/WishlistContext";

import { IMAGE_URL } from "../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VanillaButton, BackButtonArrow } from "../GlobalComponent";
import { movies } from "../utils/types";
import { useNavigate } from "react-router";
import { BASE_CLIENT_URL } from "../routes";
import {
  faArrowLeft,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import BackspaceIcon from "mdi-react/BackspaceIcon";
import Movie from "./content/movie";

interface IWishlistContainerProps {
  isWishlistEmpty: boolean;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 1.25rem;
  flex-grow: 1;
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

const WishlistContainer = styled.div<IWishlistContainerProps>`
  /* border: solid 1px white; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${({ isWishlistEmpty }) =>
    isWishlistEmpty ? "center" : "flex-start"};
  gap: 2rem;
  margin: 0 auto;
  max-width: 1080px;

  & > * {
    width: 100%;
  }
  @media (min-width: 600px) {
    padding: 1.25rem;
  }

  /* border: solid 1px white; */
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
  transition: color 0.2s, background-color 0.2s;
  visibility: visible;

  &:hover {
    color: #ed5353;
  }

  & > * {
    /* color: black; */
    transition: color 0.2s, background-color 0.2s;
    transition-delay: 0s;
    transition-timing-function: linear;
  }

  @media (min-width: 900px) {
    ${WishlistObject}:hover & {
      visibility: visible;
    }
    font-size: 2rem;
    visibility: hidden;
  }
`;

const ShownIfEmptyText = styled.h3`
  color: #666666;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

// function WishlistItem({ movie }: { movie: movies }) {
//   const { poster_path, title, release_date } = movie;
//   return (
//     <WishlistObject>
//       <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
//       <MovieTitle>{`${title} (${release_date.slice(0, 4)})`}</MovieTitle>
//       <Spacer />
//       <DeleteButton onClick={() => removeFromWishlist(movie)}>
//         {/* <FontAwesomeIcon icon={faTimes} /> */}
//         <BackspaceIcon />
//       </DeleteButton>
//     </WishlistObject>
//   );
// }

function Wishlist() {
  const wishlist = useWishlist();
  const navigate = useNavigate();

  function wishlistContent() {
    if (wishlist.length === 0) {
      return (
        <ShownIfEmptyText>
          No movie found. Go hunt for some blockbusters!
        </ShownIfEmptyText>
      );
    } else {
      return wishlist.map((movie) => {
        return (
          <Movie movie={movie} isAdd={false} backLocationName="Wishlist" />
        );
      });
    }
  }

  return (
    <Main>
      <Title>Your Wishlist</Title>
      <WishlistContainer isWishlistEmpty={wishlist.length === 0}>
        {wishlistContent()}
      </WishlistContainer>
      <BackButtonArrow onClick={() => navigate(`/${BASE_CLIENT_URL}`)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButtonArrow>
    </Main>
  );
}

export default Wishlist;
