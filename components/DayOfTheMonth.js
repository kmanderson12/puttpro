import styled from 'styled-components';
import {
  Label,
  CustomInput,
  CustomLabel,
  RadioContainer,
  RadioLabel,
  RadioInput
} from '../components/styles/FormStyles';

const DayOfTheMonth = props => {
  return (
    <>
      <Label>Day of the Month</Label>
      <RadioContainer>
        <RadioInput
          type="radio"
          id="first"
          name="dayOfMonth"
          value="first"
          checked={props.dayOfMonth === 'first'}
          onChange={props.handleChange}
        />
        <RadioLabel htmlFor="first">1st of the month</RadioLabel>
      </RadioContainer>
      <RadioContainer>
        <RadioInput
          type="radio"
          id="last"
          name="dayOfMonth"
          value="last"
          checked={props.dayOfMonth === 'last'}
          onChange={props.handleChange}
        />
        <RadioLabel htmlFor="last">Last day of the month</RadioLabel>
      </RadioContainer>
      <RadioContainer>
        <RadioInput
          type="radio"
          id="custom"
          name="dayOfMonth"
          value="custom"
          checked={props.dayOfMonth === 'custom'}
          onChange={props.handleChange}
        />
        <RadioLabel htmlFor="custom">Custom:</RadioLabel>
        <CustomDayInput
          type="number"
          inputmode="numeric"
          min="1"
          max="31"
          name="customDay"
          id="customDayInput"
          placeholder=""
          dayOfMonth={props.dayOfMonth}
          value={props.customDay}
          disabled={!(props.dayOfMonth === 'custom')}
          onChange={props.handleChange}
        />
        {/* <CustomLabel htmlFor="customDay">Enter a day of the month</CustomLabel> */}
      </RadioContainer>
    </>
  );
};

export default DayOfTheMonth;

const CustomDayInput = styled(CustomInput)`
  color: ${props =>
    props.dayOfMonth === `custom`
      ? props.theme.colors.gray700
      : props.theme.colors.gray500};
`;

/*
const customInputStyle = enabled => {
  if (enabled) {
    return {
      color: 'rgba(0,0,0,0.4)'
    };
  }
  return {
    color: 'inherit'
  };
};
*/
