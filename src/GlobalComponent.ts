import styled, { createGlobalStyle } from "styled-components";

export const GlobalTransition = createGlobalStyle`
    
    * {
        transition: color 0.2s, background-color 0.2s;
    }
`;

export const VanillaButton = styled.button`
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

export const BackButton = styled(VanillaButton)`
  border-radius: 5px;
  display: block;
  font-size: 15px;
  margin: 20px auto 0 auto;
  padding: 10px 15px;

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }

  & > * {
    vertical-align: middle;
  }
`;

export const BackButtonArrow = styled(VanillaButton)`
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

  &:hover {
    background-color: #4e4e4e;
    color: #fafafa;
  }

  & > * {
    vertical-align: middle;
  }
`;