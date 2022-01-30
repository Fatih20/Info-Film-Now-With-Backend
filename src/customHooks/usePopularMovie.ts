import { useQuery } from "react-query";
import { getMovieList } from "../utils/api";
import { movies } from "../utils/types";

export default function usePopularMovie (){
    const {data, isLoading, error} = useQuery('popularMovie', getMovieList);

    if (isLoading){
        return {
            popularMovieList : [] as movies[],
            error
        }
    } else {
        return {
            popularMovieList : data as movies[],
            error
        }
    }
}