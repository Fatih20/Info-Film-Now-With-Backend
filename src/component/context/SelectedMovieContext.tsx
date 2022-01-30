import React, { useState, useContext } from "react";
import {
  blankMovie,
  movies,
  initialBlank,
  selectedMovieContextContent,
} from "../../utils/types";

const SelectedMovieContext = React.createContext({
  selectedMovie: blankMovie,
  setSelectedMovie: initialBlank,
} as selectedMovieContextContent);

export function useSelectedMovieContext() {
  return useContext(SelectedMovieContext);
}

export default function SelectedMovieProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [selectedMovie, setSelectedMovie] = useState(blankMovie as movies);
  //   const selectedMovie = useRef(blankMovie as movies);

  //   function changeSelectedMovie(movie: movies) {
  //     selectedMovie.current = movie;
  //   }

  return (
    <SelectedMovieContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
      }}
      //   value={{
      //     currentlySelectedMovie: selectedMovie.current,
      //     changeSelectedMovie,
      //   }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
}
