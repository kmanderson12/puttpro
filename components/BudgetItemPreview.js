import { useState } from 'react';
import styled from 'styled-components';
import { Repeat } from '../components/icons';
import Modal from '../components/Modal';
import UpdateItemForm from '../components/UpdateItemForm';
import formatMoney from '../utils/formatMoney';
import formatRecurrence from '../utils/formatRecurrence';

const BudgetItemPreview = props => {
  const amount =
    props.type === 'income'
      ? `+${formatMoney(props.amount)}`
      : `-${formatMoney(props.amount)}`;

  const itemRecurrence = formatRecurrence(
    props.recurrence,
    props.dayOfWeek,
    props.dayOfMonth,
    props.customDay
  );
  return (
    <BudgetCard>
      <FlexWrapper>
        <ItemTitle>{props.title}</ItemTitle>
        <ItemRecurrence>
          <Repeat />
          {itemRecurrence}
        </ItemRecurrence>
      </FlexWrapper>
      <ItemAmount type={props.type}>{amount}</ItemAmount>
    </BudgetCard>
  );
};

export default BudgetItemPreview;

const BudgetCard = styled.div`
  background: #edf2f7;
  box-shadow: ${props => props.theme.shadows.bs1};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.75rem;
  font-size: 1.7rem;
  transition: all 0.3s;
  @media screen and (max-width: 800px) {
    padding: 1rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    width: auto;
  }
`;

const ItemTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.colors.gray700};
  min-width: 50%;
  @media screen and (max-width: 800px) {
    margin-bottom: 0.1rem;
  }
`;

const ItemRecurrence = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  min-width: 55%;
  color: ${props => props.theme.colors.gray600};
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    margin-right: 0.45rem;
    max-height: 12px;
  }
  @media screen and (max-width: 800px) {
    font-size: 1.4rem;
    justify-content: flex-start;
    margin-left: -2px;
    > svg {
      margin-right: 0.2rem;
      max-height: 12px;
    }
  }
`;

const ItemAmount = styled.p`
  text-align: right;
  width: 50%;
  font-weight: 400;
  color: ${props =>
    props.type === 'income'
      ? props.theme.colors.green200
      : props.theme.colors.red};
  @media screen and (max-width: 800px) {
    font-size: 1.8rem;
    width: auto;
  }
`;
