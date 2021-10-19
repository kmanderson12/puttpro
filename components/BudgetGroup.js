import styled from 'styled-components';
import BudgetItem from '../components/BudgetItem';

const BudgetGroup = props => {
  return (
    <>
      <GroupTitle>{props.type}</GroupTitle>
      {props.items.length > 0 ? (
        props.items.map((i, index) => (
          <BudgetItem
            title={i.title}
            type={i.type}
            amount={i.amount}
            recurrence={i.recurrence}
            id={i.id}
            key={i.id}
            dayOfMonth={i.dayOfMonth}
            dayOfWeek={i.dayOfWeek}
            customDay={i.customDay}
          />
        ))
      ) : (
        <p>Add some budget items!</p>
      )}
    </>
  );
};

export default BudgetGroup;

const GroupTitle = styled.h3`
  font-weight: 400;
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray600};
  margin-bottom: 1rem;
`;
