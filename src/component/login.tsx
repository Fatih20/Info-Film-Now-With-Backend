import styled from "styled-components";
import { useState } from "react";
import { VanillaButton } from "../GlobalComponent";

interface IFieldProps {
  labelName: string;
}

const Main = styled.div`
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
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: auto;
  padding: 0.75rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1``;

const FieldContainer = styled.div``;

const StyledInput = styled.input`
  border-radius: 0.25rem;
  padding: 0.5rem;
`;
const SubmitButton = styled(VanillaButton)`
  border-radius: 0.1rem;
  padding: 0.25rem;
`;

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {};
  return (
    <Main>
      <FormContainer>
        <Title>Log In</Title>
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
      </FormContainer>
    </Main>
  );
}
