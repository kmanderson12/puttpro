import styled from 'styled-components';
import { MoneyFace, SadFace } from '../icons';

const ItemTypeButtonGroup = props => {
  return (
    <ButtonWrapper>
      <ItemTypeButton
        name="type"
        type="button"
        value="income"
        selected={props.type}
        onClick={props.onClick}
      >
        <MoneyFace />
        Income
      </ItemTypeButton>
      <ItemTypeButton
        name="type"
        type="button"
        value="expense"
        selected={props.type}
        onClick={props.onClick}
      >
        <SadFace />
        Expense
      </ItemTypeButton>
    </ButtonWrapper>
  );
};

export default ItemTypeButtonGroup;

const ButtonWrapper = styled.div`
  border-radius: 5px;
  width: 300px;
  margin: 0 auto;
  background: ${props => props.theme.colors.gray300};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  button:nth-child(1) {
    margin-right: 0.2rem;
  }
  button:nth-child(2) {
    margin-left: 0.2rem;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ItemTypeButton = styled.button`
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray700};
  background: ${props =>
    props.selected === props.value
      ? props.theme.colors.gray400
      : props.theme.colors.gray300};
  opacity: ${props => (props.selected === props.value ? `1` : `0.5`)};
  padding: 0.5rem 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 0.4rem;
    pointer-events: none;
  }
  cursor: pointer;
  transition: all 0.3s;
`;
