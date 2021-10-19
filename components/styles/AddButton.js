import styled from 'styled-components';

const AddButton = styled.button`
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.gray700};
  color: white;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  padding: 1rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  > * {
    margin: 0 0.4rem;
  }
`;

export default AddButton;
