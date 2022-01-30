import React, { useState, useContext, useRef } from "react";
import {
  blankMovie,
  movies,
  initialBlank,
  selectedMovieContextContent,
} from "../../utils/types";

const SelectedMovieContext = React.createContext({
  currentlySelectedMovie: blankMovie,
  changeSelectedMovie: initialBlank,
} as selectedMovieContextContent);

export function useSelectedMovieContext() {
  return useContext(SelectedMovieContext);
}

export default function SelectedMovieProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const selectedMovie = useRef(blankMovie as movies);

  function changeSelectedMovie(movie: movies) {
    selectedMovie.current = movie;
  }

  return (
    <SelectedMovieContext.Provider
      value={{
        currentlySelectedMovie: selectedMovie.current,
        changeSelectedMovie,
      }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
}
