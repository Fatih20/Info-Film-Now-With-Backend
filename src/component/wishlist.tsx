import styled, { css } from "styled-components";
import { useWishlist } from "./context/WishlistContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackButtonArrow } from "../GlobalComponent";
import { useNavigate } from "react-router";
import { BASE_CLIENT_URL } from "../routes";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../customHooks/useLocalStorage";

import Movie from "./movie";
import MovieShortened from "./movieShorten";
import { useState } from "react";

type viewModeType = "Compact" | "Full";

interface IWishlistContainerProps {
  isWishlistEmpty: boolean;
  viewMode: viewModeType;
}

interface IToggleListProps {
  show: boolean;
}

interface IToggleTextProps {
  selected: boolean;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  flex-grow: 1;
  gap: 1rem;
  padding: 1.25rem;
`;

const Title = styled.h2`
  color: #fafafa;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 3rem;
  }
`;

const WishlistContainerEmpty = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`;

const WishlistContainerCompact = css`
  /* border: solid 1px white; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  gap: 2rem;
  margin: 0 auto;
  width: min(100%, 600px);

  & > * {
    width: 100%;
  }
  @media (min-width: 600px) {
    padding: 1.25rem;
  }

  /* border: solid 1px white; */
`;

const WishlistContainerFull = css`
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  row-gap: 2rem;
  justify-items: center;
  padding: 1rem 1.5rem;

  /* & > * {
    max-width: 200px;
  } */

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

const WishlistContainer = styled.div<IWishlistContainerProps>`
  ${({ isWishlistEmpty, viewMode }) => {
    if (isWishlistEmpty) {
      return WishlistContainerEmpty;
    } else {
      if (viewMode === "Compact") {
        return WishlistContainerCompact;
      } else if (viewMode === "Full") {
        return WishlistContainerFull;
      }
    }
  }}
`;

const ShownIfEmptyText = styled.h3`
  color: #666666;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

const ToggleListContainer = styled.div<IToggleListProps>`
  justify-content: center;
  color: white;
  display: ${({ show }) => (show ? "flex" : "none")};
  gap: 1rem;
`;

const ToggleListText = styled.div<IToggleTextProps>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "white" : "#666666")};
`;

function Wishlist() {
  const [viewMode, setViewMode] = useLocalStorage(
    "Full" as viewModeType,
    "viewMode"
  );
  const [wishlist] = useWishlist();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  function wishlistContent() {
    if (wishlist.length === 0) {
      return (
        <ShownIfEmptyText>
          No movie found. Go hunt for some blockbusters!
        </ShownIfEmptyText>
      );
    } else {
      return wishlist.map((movie) => {
        if (viewMode === "Full") {
          return (
            <Movie
              movie={movie}
              forMain={false}
              backLocationName="Wishlist"
              openModal={() => setModalOpen(true)}
            />
          );
        } else if (viewMode === "Compact") {
          return <MovieShortened movie={movie} backLocationName="Wishlist" />;
        } else {
          return <></>;
        }
      });
    }
  }

  return (
    <Main>
      <Title>Your Wishlist</Title>
      <ToggleListContainer show={wishlist.length > 0}>
        <ToggleListText
          onClick={() => setViewMode("Full")}
          selected={viewMode === "Full"}
        >
          Full
        </ToggleListText>
        <ToggleListText
          onClick={() => setViewMode("Compact")}
          selected={viewMode === "Compact"}
        >
          Compact
        </ToggleListText>
      </ToggleListContainer>
      <WishlistContainer
        viewMode={viewMode}
        isWishlistEmpty={wishlist.length === 0}
      >
        {wishlistContent()}
      </WishlistContainer>
      <BackButtonArrow onClick={() => navigate(`/${BASE_CLIENT_URL}`)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButtonArrow>
    </Main>
  );
}

export default Wishlist;
