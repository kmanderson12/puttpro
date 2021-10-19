import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  color: ${(props) => props.theme.colors.gray700};
  display: flex;
  flex-direction: column;
  label,
  input {
    display: block;
  }
  input[type='radio'] {
    display: inline;
  }
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin: 1rem 0 2rem 0;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  padding-left: 0.2rem;
  margin: 1rem 0 0.5rem 0;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  z-index: 1;
  border-radius: 5px;
  width: 24px;
  height: 24px;
`;

export const RadioLabel = styled.label`
  font-size: 1.2rem;
  padding-left: 0.2rem;
  display: inline;
`;

export const CustomInput = styled.input`
  background: #ffffff;
  max-width: 50px;
  margin: 0 0.5rem;
  text-align: center;
  border: 1px solid #edf2f7;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.gray700};
  font-size: 1.2rem;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  ::placeholder {
    color: ${(props) => props.theme.colors.gray500};
    font-size: 1.2rem;
  }
`;

export const CustomLabel = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.gray600};
`;

export const TextInput = styled.input`
  background: #ffffff;
  border: 1px solid #edf2f7;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 1rem;
  color: ${(props) => props.theme.colors.gray700};
  font-size: 1.2rem;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  ::placeholder {
    color: ${(props) => props.theme.colors.gray500};
    font-size: 1.2rem;
  }
`;
export const NumberInput = styled.input`
  background: #ffffff;
  border: 1px solid #edf2f7;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 1rem;
  color: ${(props) => props.theme.colors.gray700};
  font-size: 1.2rem;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  ::placeholder {
    color: ${(props) => props.theme.colors.gray500};
    font-size: 1.2rem;
  }
`;

export const CancelButton = styled.button`
  border: none;
  border-radius: 5px;
  background: none;
  color: ${(props) => props.theme.colors.gray600};
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  padding: 1rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.colors.gray200};
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 0.5rem;
  }
`;
