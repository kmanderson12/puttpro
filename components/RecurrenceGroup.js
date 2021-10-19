import styled from 'styled-components';

// TODO: Add Semi-Monthly option (i.e. 15th and last day of month)

const RecurrenceGroup = props => {
  return (
    <ButtonWrapper>
      <RecurrenceButton
        name="recurrence"
        type="button"
        value="weekly"
        selected={props.recurrence}
        onClick={props.handleChange}
      >
        Weekly
      </RecurrenceButton>
      <RecurrenceButton
        name="recurrence"
        type="button"
        value="bi-weekly"
        selected={props.recurrence}
        onClick={props.handleChange}
      >
        Bi-Weekly
      </RecurrenceButton>
      <RecurrenceButton
        name="recurrence"
        type="button"
        value="monthly"
        selected={props.recurrence}
        onClick={props.handleChange}
      >
        Monthly
      </RecurrenceButton>
    </ButtonWrapper>
  );
};

export default RecurrenceGroup;

const ButtonWrapper = styled.div`
  border-radius: 5px;
  width: 100%;
  margin: 0 auto;
  background: ${props => props.theme.colors.gray300};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  button:nth-child(1) {
    margin-right: 0.2rem;
  }
  button:nth-child(3) {
    margin-left: 0.2rem;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const RecurrenceButton = styled.button`
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
  opacity: ${props => (props.selected === props.value ? `1` : `0.6`)};
  padding: 0.75rem;
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
