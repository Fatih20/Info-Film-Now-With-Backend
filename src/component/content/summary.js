import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

const Main = styled.div`
    display: flex;
`;

const DescriptionContainer = styled.div`
    color: #fafafa;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
`;

const MovieTitle = styled.h2`
    font-size: 60px;
`;

const MovieDate = styled.p`
    font-size: 18px;
`;

const MovieOverview = styled.p`
    font-size: 19px;
    line-height: 1.4;
    margin: 15px 0px;
`;

const MoviePoster = styled.img`
`;

function Summary ({movie: { poster_path, title, release_date, overview }}){
    return (
        <Main>
            <MoviePoster src={`${IMAGE_URL}${poster_path}`}/>
            <DescriptionContainer>
                <MovieTitle>{title}</MovieTitle>
                <MovieDate>{release_date}</MovieDate>
                <MovieOverview>{overview}</MovieOverview>
            </DescriptionContainer>
        </Main>
    )
};

export default Summary;