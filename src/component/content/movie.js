import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";
import { VanillaButton } from '../../GlobalComponent';

const Main = styled.div`
    color: #fafafa;
    max-width: 300px;
    padding: 20px 0px;
    position: relative;
    text-align: center;
`;

const MovieTitle = styled.h2`
    font-weight: 700;
    font-size: 30px;
    margin-top: 15px;
    margin-bottom: 5px;
`;

const MoviePoster = styled.img`
`;

const MovieYear = styled.p`
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const ImageContainer = styled.div`
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 5;
    ${ImageContainer}:hover &{
        background-color: rgba(0, 0, 0, 0.5);
    }

    @media(max-width: 900px){
        display: none;
    }
`;

const ButtonContainer = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: none;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    width: 100%; 
`;

const ButtonContainerLargeScreen = styled(ButtonContainer)`
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%; 
    z-index: 10;

    ${Main}:hover &{
        display: flex
    }

    @media(max-width: 900px){
        display: none;
    }
`;

const ButtonContainerSmallScreen = styled(ButtonContainer)`
    display: flex;


    @media(min-width: 900px){
        display: none;
    }
`;

const MovieButton = styled(VanillaButton)`
    border-radius: 5px;
    padding: 7px;
    width: 50%; 

    &:hover {
        background-color: #4e4e4e; 
        color: #fafafa;
    }
`;

const WishlistButton = styled(MovieButton)`
    background-color: #e50914;
    color: #fafafa;

    transition: all 0.2s;

    &:hover {
        background-color: #a10705;
        color: #fafafa;
    }
`;

const SummaryButton = styled(MovieButton)`
    &:hover {
        background-color: #4e4e4e;
        color: #fafafa;
    }
`;

function Movie ({movie : { poster_path, title, release_date }, changeToSummary}){
    return (
        <Main>
            <ImageContainer>
                <Overlay />
                <ButtonContainerLargeScreen>
                    <WishlistButton>Add to Wishlist</WishlistButton>
                    <SummaryButton onClick={changeToSummary}>About the Movie</SummaryButton>
                </ButtonContainerLargeScreen>
                <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
            </ImageContainer>
            <MovieTitle>{title}</MovieTitle>
            <MovieYear>{release_date.slice(0, 4)}</MovieYear>
            <ButtonContainerSmallScreen>
                <WishlistButton>Add to Wishlist</WishlistButton>
                <SummaryButton onClick={changeToSummary}>About the Movie</SummaryButton>
            </ButtonContainerSmallScreen>
        </Main>
    )
}

export default Movie;
