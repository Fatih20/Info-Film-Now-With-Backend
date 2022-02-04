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

export function initialBlankUserPosition(newUserPosition: TUserPosition) {
    console.log("");
}

export type takeMovieReturnVoid = (movie: movies) => void;
export type takeUserPositionReturnVoid = (userPosition: TUserPosition) => void;
  

export interface selectedMovieContextContent {
    selectedMovie : movies,
    setSelectedMovie : takeMovieReturnVoid
}

export interface TUserPosition {
    positionX : number,
    positionY : number,
}

export interface IUserPositionContext {
    userPosition : TUserPosition,
    saveUserPosition : () => void,
    restoreUserPosition : () => void

}

export type locationName = "Wishlist" | "Movie List";

export interface IBackLocationContext {
    backLocation : locationName,
    setBackLocation : (destination : locationName) => void,
    backPath : string,
}

export type wishlistContextType = [movies[], number]