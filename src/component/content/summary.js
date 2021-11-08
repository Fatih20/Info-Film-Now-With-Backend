import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

const Main = styled.div`
    display: flex;
    @media(max-width: 900px){
        align-items: center;
        flex-direction: column;
    }
`;

const DescriptionContainer = styled.div`
    color: #fafafa;
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    @media(max-width: 900px){
        padding: 0;
    }
`;

const MovieTitle = styled.h2`
    font-size: 60px;
    @media(max-width: 900px){
        font-size: 50px;
        text-align: center;
    }

    @media(max-width: 400px){
        font-size: 35px;
    }
`;

const MovieDate = styled.p`
    font-size: 18px;
    @media(max-width: 900px){
        text-align: center;
    }
`;

const MovieOverview = styled.p`
    font-size: 19px;
    line-height: 1.4;
    margin: 15px 0px;

    @media(max-width: 600px){
        font-size: 17px;
    }

    @media(max-width: 500px){
        text-align: center;
    }
    
`;

const MoviePoster = styled.img`
    @media(max-width: 900px){
        margin-bottom: 20px;
        max-width: 300px;
        width: 100%;
    }
`;

function Summary ({movie: { poster_path, title, release_date, overview }}){
    return (
        <Main>
            <MoviePoster src={`${IMAGE_URL}${poster_path}`}/>
            <DescriptionContainer>
                <MovieTitle>{title}</MovieTitle>
                <MovieDate>({release_date.slice(0, 4)})</MovieDate>
                <MovieOverview>{overview}</MovieOverview>
            </DescriptionContainer>
        </Main>
    )
};

export default Summary;