import styled from "styled-components";
import { useState } from "react";
import { VanillaButton } from "../GlobalComponent";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IFieldProps {
  labelName: string;
}

const Main = styled.div`
  --primary: #67d8a2;
  --secondary: #00b0e6;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const FormContainer = styled.div`
  align-items: center;
  background-color: #333333;
  color: white;
  border-radius: 0.25rem;
  display: flex;
  font-size: 1.1rem;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  margin: auto;
  padding: 0.75rem 1.5rem;

  /* border: solid 1px white; */
`;

const UserIconWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1``;

const FieldContainer = styled.div``;

const StyledInput = styled.input`
  border: none;
  border-radius: 0.25rem;
  color: #00b0e6;
  font-size: 1em;
  max-width: 15rem;
  padding: 0.5rem;

  &:focus {
    outline: solid 2px var(--secondary);
  }

  &:hover::placeholder,
  &:focus::placeholder {
    color: rgba(0, 176, 230, 0.5);
    /* filter: brightness(200%); */
  }

  &::placeholder {
    color: rgba(0, 176, 230, 0.3);
  }
`;
const SubmitButton = styled(VanillaButton)`
  background-color: var(--secondary);
  color: white;
  border-radius: 0.25rem;
  font-size: 1em;
  padding: 0.5rem;

  &:hover {
    background-color: white;
    color: var(--secondary);
  }
`;

const SignUpRedirect = styled.p`
  /* border: solid 1px white; */
  display: inline-block;
  max-width: 200px;
  text-align: center;
`;

const LinkToSignIn = styled.a`
  color: var(--secondary);
  cursor: pointer;

  &:hover {
    /* color: white; */
    filter: brightness(110%);
  }
`;

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {};
  return (
    <Main>
      <FormContainer>
        {/* <Title>Log In</Title> */}
        <UserIconWrapper>
          <FontAwesomeIcon icon={faUser} size="3x" />
        </UserIconWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="username"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </StyledForm>
        <SubmitButton>Log In</SubmitButton>
        <SignUpRedirect>
          Don't have an account yet? <LinkToSignIn>Sign up!</LinkToSignIn>
        </SignUpRedirect>
      </FormContainer>
    </Main>
  );
}
