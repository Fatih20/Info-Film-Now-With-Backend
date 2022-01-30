import React, { useContext, useState, useEffect } from "react";
import { movies } from "../../utils/types";

import { initialBlank, takeMovieReturnVoid } from "../../utils/types";

const WishlistContext = React.createContext([] as movies[]);
const RemoveFromWishlistContext = React.createContext(
  initialBlank as takeMovieReturnVoid
);
const AddToWishlistContext = React.createContext(
  initialBlank as takeMovieReturnVoid
);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function useRemoveFromWishlist() {
  return useContext(RemoveFromWishlistContext);
}

export function useAddToWishlist() {
  return useContext(AddToWishlistContext);
}

export function WishlistProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [wishlist, setWishlist] = useState([] as movies[]);

  useEffect(() => {
    const wishlistCandidate = JSON.parse(
      localStorage.getItem("Wishlist") || "{}"
    );
    if (wishlistCandidate !== undefined && wishlistCandidate !== null) {
      setWishlist(wishlistCandidate);
    }
    return;
  }, []);

  useEffect(() => {
    localStorage.setItem("Wishlist", JSON.stringify(wishlist));
    console.log(wishlist);
  }, [wishlist]);

  // localStorage.removeItem("Wishlist");

  function removeFromWishlist(removedMovie: movies) {
    console.log("B");
    setWishlist((prevWishlist) => {
      return prevWishlist.filter(
        (movieInWishlist) =>
          JSON.stringify(movieInWishlist) !== JSON.stringify(removedMovie)
      );
    });
  }

  function addToWishlist(movie: movies) {
    console.log("A");
    setWishlist((prevWishlist) => {
      let isInWishlist = false;
      for (const movieInWishlist of prevWishlist) {
        if (JSON.stringify(movie) === JSON.stringify(movieInWishlist)) {
          isInWishlist = true;
          break;
        }
      }
      if (isInWishlist === false) {
        return prevWishlist.concat([movie]);
      } else {
        return prevWishlist;
      }
    });
  }

  return (
    <WishlistContext.Provider value={wishlist}>
      <RemoveFromWishlistContext.Provider value={removeFromWishlist}>
        <AddToWishlistContext.Provider value={addToWishlist}>
          {children}
        </AddToWishlistContext.Provider>
      </RemoveFromWishlistContext.Provider>
    </WishlistContext.Provider>
  );
}
