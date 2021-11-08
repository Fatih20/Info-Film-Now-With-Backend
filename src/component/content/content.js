import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

import Movie from './movie';
import Summary from './summary';
import Wishlist from './wishlist';

import { VanillaButton } from '../../GlobalComponent';

import { useAddToWishlist } from '../context/WishlistContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MainIsList = css`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
`;

const MainIsSummary = css`
    flex-direction: column;
`;

const Main = styled.div`
    background-color: #1a1a1a;
    display: flex;
    padding: 20px;
    ${({typeOfContent})=>{
        if (typeOfContent === "list" || typeOfContent === "wishlist"){
            return MainIsList;
        } else {
            return MainIsSummary;
        }
    }};

    @media(max-width: 400px){
        padding: 20px 5px;
    }
`;

const ExplanationContainer = styled.div`
    border-bottom: #fafafa 1px solid;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1280px;
    padding: 30px;

    @media(max-width: 900px){
        border: none;
    }
`;

const BackButton = styled(VanillaButton)`
    background-color: #fafafa;
    border-radius: 50%;
    bottom: 20px;
    color: #4e4e4e;
    font-size: 32px;
    height: 75px;
    left: 20px;
    position: fixed;
    width: 75px;
    z-index: 10;

    &:hover{
        background-color: #4e4e4e;
        color: #fafafa;
    }

    & > * {
        vertical-align: middle;
    }
`;

const WishlistButton = styled(VanillaButton)`
    background-color: #fafafa;
    border-radius: 50%;
    bottom: 20px;
    color: #4e4e4e;
    font-size: 32px;
    height: 75px;
    left: 20px;
    position: fixed;
    width: 75px;
    z-index: 10;

    &:hover{
        background-color: #4e4e4e;
        color: #fafafa;
    }

    & > * {
        vertical-align: middle;
    }

`;

function Content (){
    const[movieData, setMovieData] = useState([]);
    const[typeOfContent, setTypeOfContent] = useState("list");
    const examinedMovie = useRef({});
    const userPositionInList = useRef({positionX: 0, positionY:0});

    const addToWishlist = useAddToWishlist();
    
    async function getMovieList(){
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        const movieData = data.results;
        return movieData;
    }

    useEffect(()=>{
        getMovieList().then(movieData => {
            setMovieData(movieData)});
    }, []);

    useEffect(() => {
        if (typeOfContent === "list"){
            window.scrollTo(userPositionInList.current.positionX, userPositionInList.current.positionY);
        }
    }, [typeOfContent])

    function changeToSummary(movie){
        userPositionInList.current = {positionX : window.scrollX, positionY : window.scrollY};
        examinedMovie.current = movie;
        setTypeOfContent("summary");
    }

    function changeToList(){
        setTypeOfContent("list");
    }

    function changeToWishlist(){
        userPositionInList.current = {positionX : window.scrollX, positionY : window.scrollY};
        setTypeOfContent("wishlist");
    }

    function movieMaker (movie){
        return (
            <Movie key={movie.poster_path} movie={movie} changeToSummary={() => changeToSummary(movie)} addToWishlist={()=> addToWishlist(movie)}/>
        )
     }
    
    if (typeOfContent === "list"){
        return(
            <>
                <WishlistButton onClick={changeToWishlist}>
                    <FontAwesomeIcon icon="shopping-cart" />
                </WishlistButton>
                <Main typeOfContent={typeOfContent}>
                    {movieData.map(movieMaker)}
                </Main>
            </>
        )
    } else if (typeOfContent === "summary") {
        return (
            <Main typeOfContent={typeOfContent}>
                <ExplanationContainer>
                    <Summary movie={examinedMovie.current} />
                    <BackButton onClick={changeToList}>
                        <FontAwesomeIcon icon="arrow-left" />
                    </BackButton>
                </ExplanationContainer>
            </Main>
        )
    } else if (typeOfContent === "wishlist"){
        return (
            <>
                <Wishlist />
                <BackButton onClick={changeToList}>
                    <FontAwesomeIcon icon="arrow-left" />
                </BackButton>
            </>
        )
    }
};

export default Content;