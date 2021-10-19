import { useState, useContext } from 'react';
import { store, ADD_ITEM } from '../components/context/GlobalProvider';
import styled from 'styled-components';
import DayOfTheMonth from '../components/DayOfTheMonth';
import DayOfTheWeek from '../components/DayOfTheWeek';
import ItemTypeButtonGroup from '../components/styles/ItemTypeButtonGroup';
import AddButton from '../components/styles/AddButton';
import { Plus } from '../components/icons';
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

//TODO: Consider adding preview of new item within modal

const AddItemForm = props => {
  const { dispatch, state } = useContext(store);
  const newId = state.items.length + 1;
  const [newItem, setNewItem] = useState({
    id: newId,
    type: 'income',
    title: '',
    amount: '',
    recurrence: 'monthly',
    dayOfWeek: 'Monday',
    dayOfMonth: 'first',
    customDay: 15
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      newItem.recurrence === 'monthly' &&
      newItem.dayOfMonth === 'custom' &&
      newItem.customDay === ''
    ) {
      return alert('Please select a day of the month.');
    }
    dispatch({ type: ADD_ITEM, payload: newItem });
    props.cancel();
  };
  const handleCancel = e => {
    e.preventDefault();
    props.cancel();
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };
  const {
    id,
    type,
    title,
    amount,
    recurrence,
    dayOfWeek,
    dayOfMonth,
    customDay
  } = newItem;
  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Add New Budget Item</FormTitle>
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
        <CancelButton type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
        <AddButton type="submit">
          <Plus />
          Add New Item
        </AddButton>
      </ButtonContainer>
    </Form>
  );
};

export default AddItemForm;

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
