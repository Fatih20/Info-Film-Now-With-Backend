import React from 'react';
import styled from "styled-components";

const Main = styled.div`
    background-color: black;
    color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    & > * {
        display: inline-block;
        text-align: center;
    }
`;

const Logo = styled.img`
    margin-top: 10px;
    max-width: 150px;

    @media(max-width: 400px){
        margin-top: 10px;
    }
`;

const Title = styled.h1`
`;

function Header (){
    return (
        <Main>
            <Title>Cinema's Most Popular</Title>
            <Logo  src="blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"/>
        </Main>
    )
}

export default Header;