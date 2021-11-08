import React, { useEffect, useState } from 'react';
import styled, { css } from "styled-components";

import { useWishlist, useRemoveFromWishlist } from '../context/WishlistContext';

import { IMAGE_URL } from "../../config";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VanillaButton } from '../../GlobalComponent';

const Main = styled.div`
    padding: 20px;
`;

const Title = styled.h2`
    color: #fafafa;
    font-size: 45px; 
    margin-bottom: 20px;
    text-align: center;
`;

const WishlistContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 0 auto;
    width: 50%;

    & > * {
        width: 100%;
    }
`;

const WishlistObject = styled.div`
    align-items: center;
    background-color: #333333;
    border: solid 2px #666666;
    border-radius: 10px;
    display: flex;
    gap: 20px;
    padding: 15px;
`;

const MoviePoster = styled.img`
    height: 150px;
`;

const MovieTitle = styled.h2`
    color: #fafafa;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const DeleteButton = styled(VanillaButton)`
    background-color: rgba(0, 0, 0, 0);
    font-size: 30px;
    color: #fafafa;
    display: none;
    margin-right: 20px;

    ${WishlistObject}:hover & {
        display: inline-block;
    }
    &:hover{
        color: #ed5353;
    }
`;



function Wishlist(){
    const wishlist = useWishlist();
    const removeFromWishlist = useRemoveFromWishlist();

    function wishlistObjectGenerator(movie){
        const { poster_path, title, release_date } = movie;
        return(
            <WishlistObject>
                <MoviePoster src={`${IMAGE_URL}${poster_path}`} />
                <MovieTitle>{`${title} (${release_date.slice(0,4)})`}</MovieTitle>
                <Spacer />
                <DeleteButton onClick={()=> removeFromWishlist(movie)}>
                    <FontAwesomeIcon icon="trash" />
                </DeleteButton>
            </WishlistObject>
        )
    }

    return(
        <Main>
            <Title>Your Wishlist</Title>
            <WishlistContainer>
                {wishlist.map(wishlistObjectGenerator)}
            </WishlistContainer>
        </Main>
    )
};

export default Wishlist;