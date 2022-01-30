export interface movies {
    poster_path : string,
    title : string,
    release_date : string,
    overview : string,
}

export const blankMovie = {
poster_path: "",
title: "",
overview: "",
release_date: "",
}

export function initialBlank(movie: movies) {
console.log("");
}

export type takeMovieReturnVoid = (movie: movies) => void;
  

export interface selectedMovieContextContent {
    currentlySelectedMovie : movies,
    changeSelectedMovie : takeMovieReturnVoid
}