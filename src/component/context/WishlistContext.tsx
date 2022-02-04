import React, { useContext, useRef, useState } from "react";
import useLocalStorage from "../../customHooks/useLocalStorage";
import useNotFirstEffect from "../../customHooks/useNotFirstEffect";
import { movies } from "../../utils/types";

import { initialBlank, takeMovieReturnVoid } from "../../utils/types";

import { wishlistContextType } from "../../utils/types";

const WishlistContext = React.createContext([[], 0] as wishlistContextType);
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
  const [wishlist, setWishlist] = useLocalStorage([] as movies[], "Wishlist");
  const [timesWishlistChanged, setTimesWishlistChanged] = useState(-1);
  const previousWishlist = useRef(wishlist);

  function removeFromWishlist(removedMovie: movies) {
    console.log("B");
    // setTimesWishlistChanged(
    //   (prevTimesWishlistChanged) => prevTimesWishlistChanged + 1
    // );
    setWishlist((prevWishlist: movies[]) => {
      return prevWishlist.filter(
        (movieInWishlist) =>
          JSON.stringify(movieInWishlist) !== JSON.stringify(removedMovie)
      );
    });
  }

  function addToWishlist(movie: movies) {
    console.log("A");
    // setTimesWishlistChanged(
    //   (prevTimesWishlistChanged) => prevTimesWishlistChanged + 1
    // );
    // timesWishlistChanged.current = timesWishlistChanged.current + 1;
    setWishlist((prevWishlist: movies[]) => {
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

  useNotFirstEffect(() => {
    if (JSON.stringify(wishlist) !== JSON.stringify(previousWishlist.current)) {
      setTimesWishlistChanged(
        (prevTimesWishlistChanged) => prevTimesWishlistChanged + 1
      );
    }
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={[wishlist, timesWishlistChanged]}>
      <RemoveFromWishlistContext.Provider value={removeFromWishlist}>
        <AddToWishlistContext.Provider value={addToWishlist}>
          {children}
        </AddToWishlistContext.Provider>
      </RemoveFromWishlistContext.Provider>
    </WishlistContext.Provider>
  );
}
