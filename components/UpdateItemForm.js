import { useState, useContext } from 'react';
import {
  store,
  UPDATE_ITEM,
  DELETE_ITEM
} from '../components/context/GlobalProvider';
import styled from 'styled-components';
import DayOfTheMonth from '../components/DayOfTheMonth';
import DayOfTheWeek from '../components/DayOfTheWeek';
import ItemTypeButtonGroup from '../components/styles/ItemTypeButtonGroup';
import AddButton from '../components/styles/AddButton';
import { Check, Trash } from '../components/icons';
import RecurrenceGroup from '../components/RecurrenceGroup';
import BudgetItemPreview from '../components/BudgetItemPreview';
import {
  Form,
  FormTitle,
  Label,
  TextInput,
  NumberInput,
  CancelButton,
  ButtonContainer
} from '../components/styles/FormStyles';

const UpdateItemForm = props => {
  const { dispatch } = useContext(store);
  const [item, setItem] = useState({
    id: props.id,
    type: props.type,
    title: props.title,
    amount: props.amount,
    recurrence: props.recurrence,
    dayOfMonth: props.dayOfMonth,
    dayOfWeek: props.dayOfWeek,
    customDay: props.customDay
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      item.recurrence === 'monthly' &&
      item.dayOfMonth === 'custom' &&
      item.customDay === ''
    ) {
      return alert('Please select a day of the month.');
    }
    dispatch({ type: UPDATE_ITEM, payload: item });
    props.cancel();
  };
  const handleDelete = e => {
    e.preventDefault();
    const answer = window.confirm(
      'You sure about that? \nPress OK to delete. Cancel to go back.'
    );
    answer && dispatch({ type: DELETE_ITEM, payload: item });
  };
  const handleCancel = e => {
    e.preventDefault();
    props.cancel();
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };
  const {
    id,
    type,
    title,
    amount,
    recurrence,
    dayOfMonth,
    dayOfWeek,
    customDay
  } = item;
  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Edit Budget Item</FormTitle>
      <ItemTypeButtonGroup type={type} onClick={handleChange} />
      <FlexContainer>
        <FormItem>
          <Label>Description</Label>
          <TextInput
            type="text"
            name="title"
            placeholder="Name of Item"
            onChange={handleChange}
            value={title}
            required
          />
        </FormItem>
        <FormItem>
          <Label>Amount</Label>
          <NumberInput
            type="number"
            min="1"
            step="1"
            name="amount"
            placeholder="$100"
            onChange={handleChange}
            value={amount}
            required
          />
        </FormItem>
        <FormItemRecurrence>
          <Label>Recurrence</Label>
          <RecurrenceGroup
            recurrence={recurrence}
            handleChange={handleChange}
          />
        </FormItemRecurrence>
        <FormItem>
          {recurrence === 'monthly' ? (
            <DayOfTheMonth
              handleChange={handleChange}
              dayOfMonth={dayOfMonth}
              customDay={customDay}
            />
          ) : (
            <DayOfTheWeek handleChange={handleChange} dayOfWeek={dayOfWeek} />
          )}
        </FormItem>
      </FlexContainer>
      <PreviewContainer>
        <PreviewTitle>Preview</PreviewTitle>
        <BudgetItemPreview
          title={title === '' ? 'New Item' : title}
          type={type}
          amount={amount}
          recurrence={recurrence}
          id={id}
          dayOfMonth={dayOfMonth}
          dayOfWeek={dayOfWeek}
          customDay={customDay}
        />
      </PreviewContainer>
      <ButtonContainer>
        <CancelButton style={cancelStyle} type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
        <AddButton type="submit">
          <Check />
          Update Item
        </AddButton>
      </ButtonContainer>
      <DangerContainer>
        <DangerTitle>Da-Da-Danger Zone</DangerTitle>
        <DangerMessage>Deleting can't be undone.</DangerMessage>
        <DangerButton type="button" onClick={handleDelete}>
          <Trash />
          Delete Item
        </DangerButton>
      </DangerContainer>
    </Form>
  );
};

export default UpdateItemForm;

const FlexContainer = styled.div`
  min-height: 210px;
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem 0 0;
  min-width: 250px;
  @media screen and (max-width: 500px) {
    min-width: 300px;
  }
  @media screen and (max-width: 400px) {
    min-width: 250px;
  }
`;

const FormItemRecurrence = styled(FormItem)`
  min-height: 125px;
  @media screen and (max-width: 580px) {
    min-height: auto;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding: 1rem 0.25rem;
  border-radius: 5px;
  box-shadow: ${props => props.theme.shadows.inset};
  background: ${props => props.theme.colors.gray100};
`;

const PreviewTitle = styled.h4`
  text-align: center;
  font-weight: 400;
`;

const DangerContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DangerButton = styled(AddButton)`
  background: ${props => props.theme.colors.red};
  color: white;
`;

const DangerTitle = styled.h4`
  text-align: center;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const DangerMessage = styled.p`
  color: ${props => props.theme.colors.gray600};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const cancelStyle = {
  padding: '1.5rem'
};
