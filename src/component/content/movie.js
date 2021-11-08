import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

import { API_KEY, IMAGE_URL } from "../../config";

const Main = styled.div`
    cursor: pointer;
    color: #fafafa;
    max-width: 300px;
    padding: 20px 0px;
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

function Movie ({movie : { poster_path, title, release_date }, changeToSummary}){
    return (
        <Main onClick={changeToSummary}>
            <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
            <MovieTitle>{title}</MovieTitle>
            <MovieYear>{release_date.slice(0, 4)}</MovieYear>
        </Main>
    )
}

export default Movie;
