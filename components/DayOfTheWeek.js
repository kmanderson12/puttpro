import styled from 'styled-components';
import { Label } from '../components/styles/FormStyles';
import { ChevronDown } from '../components/icons';

const DayOfTheWeek = (props) => {
  return (
    <>
      <Label>Day of the Week</Label>
      <CustomSelect>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          onChange={props.handleChange}
          defaultValue={props.dayOfWeek}
          required
        >
          <option disabled value="select">
            Select An Option
          </option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <IconContainer>
          <ChevronDown />
        </IconContainer>
      </CustomSelect>
    </>
  );
};

export default DayOfTheWeek;

const CustomSelect = styled.div`
  display: inline-block;
  position: relative;
  width: 110px;
  select {
    display: block;
    appearance: none;
    background: #ffffff;
    border: 1px solid ${(props) => props.theme.colors.gray400};
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 1rem;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.gray700};
    :hover {
      border-color: ${(props) => props.theme.colors.gray500};
    }
  }
  @media screen and (min-width: 376px) and (max-width: 500px) {
    width: 125px;
  }
`;

const IconContainer = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 0.5rem;
  svg {
    height: 20px;
  }
`;
