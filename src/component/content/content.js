import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

import Movie from './movie';
import Summary from './summary';

import { VanillaButton } from '../../GlobalComponent';

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
    ${({isList})=>{
        if (isList){
            return MainIsList;
        } else {
            return MainIsSummary;
        }
    }}
`;

const ExplanationContainer = styled.div`
    border-bottom: #fafafa 1px solid;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1280px;
    padding: 30px;
`;

const BackButton = styled(VanillaButton)`
    border-radius: 5px;
    display: block;
    font-size: 15px;
    margin: 20px auto 0 auto;
    padding: 10px 15px;
    transition: all 0.2s;

    &:hover {
        background-color: #4e4e4e;
        color: #fafafa;
    }
`;

function Content (){
    const[movieData, setMovieData] = useState([]);
    const[isList, setIsList] = useState(true);
    const examinedMovie = useRef({});
    const userPositionInList = useRef({positionX: 0, positionY:0});
    
    async function getMovieList(){
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        const movieData = data.results;
        return movieData;
    }

    useEffect(()=>{
        getMovieList().then(movieData => {
            console.log(movieData);
            setMovieData(movieData)});
    }, []);

    useEffect(() => {
        if (isList){
            window.scrollTo(userPositionInList.current.positionX, userPositionInList.current.positionY);
        }
    }, [isList])

    function changeToSummary(movie){
        userPositionInList.current = {positionX : window.scrollX, positionY : window.scrollY}
        examinedMovie.current = movie;
        setIsList(prevIsList => !prevIsList);
    }

    function changeToList(){
        setIsList(prevIsList => !prevIsList);
    }

    function movieMaker (movie){
        return (
            <Movie key={movie.poster_path} movie={movie} changeToSummary={() => changeToSummary(movie)}/>
        )
     }
    
    if (isList){
        return(
            <Main isList={isList}>
                {movieData.map(movieMaker)}
            </Main>
        )
    } else {
        return (
            <Main isList={isList}>
                <ExplanationContainer>
                    <Summary movie={examinedMovie.current} />
                    <BackButton onClick={changeToList}>Return to the movie list</BackButton>
                </ExplanationContainer>
            </Main>
        )
    }
};

export default Content;