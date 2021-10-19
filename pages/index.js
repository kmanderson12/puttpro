import React, { useState } from 'react';
import {
  Button,
  Text,
  SimpleGrid,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

const Index = () => (
  <Flex direction="column" align="center" margin="0 auto" p={10} maxW="400">
    <Range />
    <Attempts />
    <Button>Log Putts</Button>
    <Table variant="simple" my="8">
      <Thead>
        <Tr>
          <Th>Distance</Th>
          <Th isNumeric>Makes/Attempts</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>15ft</Td>
          <Td isNumeric>8/10</Td>
        </Tr>
      </Tbody>
    </Table>
  </Flex>
);

export default Index;

const PuttLogger = (props) => {
  const [value, setValue] = useState(15);

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

  const [makes, setMakes] = useState(0);

  function handleChange(e) {
    const num = e.target.dataset['number'];
    num == makes ? setMakes(0) : setMakes(num);
  }
  const attemptsArray = [...Array(10).keys()].map((i) => (i = i + 1));

  return (
    <Flex direction="column" align="center" margin="0 auto" p={10} maxW="400">
      <Range />
      <Attempts />
      <Button>Log Putts</Button>
      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th>Distance</Th>
            <Th isNumeric>Makes/Attempts</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>15ft</Td>
            <Td isNumeric>8/10</Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  );
};

const Range = (props) => {
  const [value, setValue] = useState(15);

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
      <Text textTransform="uppercase">Distance</Text>
      <Text fontSize="3xl">{value}ft</Text>
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

const Attempts = (props) => {
  const [makes, setMakes] = useState(0);

  function handleChange(e) {
    const num = e.target.dataset['number'];
    num == makes ? setMakes(0) : setMakes(num);
  }
  const attemptsArray = [...Array(10).keys()].map((i) => (i = i + 1));

  return (
    <Flex direction="column" align="center" my={8}>
      <Text textTransform="uppercase">Makes</Text>
      <Text fontSize="3xl">{makes}/10</Text>
      <SimpleGrid
        columns="5"
        rows="2"
        gap="4"
        bg="gray.100"
        borderRadius="8"
        width="100%"
        p="2"
      >
        {attemptsArray.map((n, i) => (
          <Button
            key={n}
            data-number={n}
            bg={n <= makes ? 'green.200' : 'white'}
            borderRadius="4"
            onClick={handleChange}
            color={n <= makes ? 'green.700' : 'gray.500'}
          >
            {n}
          </Button>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
