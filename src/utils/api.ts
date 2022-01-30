import { API_KEY, BASE_URL } from "../config";
import axios from 'axios';

export const OPTIONS = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  

export async function getMovieList (){
    return await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`).then((res) => res.data)
}