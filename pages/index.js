import React, { useState } from 'react';
import styled from 'styled-components';
import Budget from '../components/Budget';
import {
  Button,
  Text,
  Container,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const Index = () => (
  <Container>
    <Range />
    <div>
      <h1>Here's a fresh start.</h1>
    </div>
  </Container>
);

export default Index;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const Range = (props) => {
  const [value, setValue] = useState(15);

  function handleChange(e) {
    setValue(e.target.value);
    console.log(value);
  }

  function roundByFive(x) {
    return Math.ceil(x / 5) * 5;
  }

  function increment() {
    let newValue =
      value % 5 === 0 ? roundByFive(value + 5) : roundByFive(value);
    setValue(newValue);
  }

  function decrement() {
    let newValue = value - 5 <= 5 ? 5 : roundByFive(value - 5);
    setValue(newValue);
  }

  return (
    <Flex direction="column" align="center">
      <label htmlFor="volume">Distance</label>
      <Text>{value}ft</Text>
      <Flex>
        <Button onClick={decrement}>-</Button>
        <Slider
          aria-label="slider-ex-5"
          value={value}
          onChange={(val) => setValue(val)}
          min={5}
          max={30}
          mx={2}
          minW={300}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button onClick={increment}>+</Button>
      </Flex>
    </Flex>
  );
};

const RangeContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;

  label {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  input {
    max-width: 300px;
  }

  .range-flex {
    display: flex;
  }

  .range-btn {
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.colors.gray200};
    text-align: center;
    border-radius: 4px;
  }
`;

const BudgetHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const BudgetTitle = styled.h2`
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray700};
`;

const InsetContainer = styled.div`
  background: ${(props) => props.theme.colors.gray100};
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  max-width: 800px;
  min-height: 70vh;
  /* overflow-y: scroll; */
  margin: 0 auto;
  padding: 2rem;
  @media screen and (max-width: 800px) {
    padding: 2rem 1rem;
  }
`;
