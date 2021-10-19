import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
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

const Index = () => <PuttLogger />;

export default Index;

const PuttLogger = (props) => {
  const [distance, setDistance] = useState(15);
  const [makes, setMakes] = useState(0);
  const [puttLog, setPuttLog] = useState([]);

  const minDistance = 5;
  const maxDistance = 60;

  function roundByFive(x) {
    return Math.ceil(x / 5) * 5;
  }

  function increment() {
    let newValue =
      distance % 5 === 0 && distance < maxDistance
        ? roundByFive(distance + 5)
        : roundByFive(distance);
    setDistance(newValue);
  }

  function decrement() {
    let newValue = distance - 5 <= 5 ? 5 : roundByFive(distance - 5);
    setDistance(newValue);
  }

  function handleAttemptsChange(e) {
    const num = e.target.dataset['number'];
    num == makes ? setMakes(0) : setMakes(num);
  }

  function logPutts() {
    const newPuttLog = {
      distance: `${distance}ft`,
      makes: `${makes}/10`,
    };
    setPuttLog([...puttLog, newPuttLog]);
    setMakes(0);
  }

  return (
    <Flex direction="column" align="center" margin="0 auto" p={10} maxW="400">
      <Distance
        value={distance}
        increment={increment}
        decrement={decrement}
        setValue={setDistance}
        minDistance={minDistance}
        maxDistance={maxDistance}
      />
      <Attempts makes={makes} handleChange={handleAttemptsChange} />
      <Button disabled={makes === 0} onClick={logPutts}>
        Log Putts
      </Button>
      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th>Distance</Th>
            <Th isNumeric>Makes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {puttLog.length ? (
            puttLog.map((i) => (
              <Tr>
                <Td>{i.distance}</Td>
                <Td isNumeric>{i.makes}</Td>
              </Tr>
            ))
          ) : (
            <Tr textAlign="center">Log some putts.</Tr>
          )}
        </Tbody>
      </Table>
      <Flex>
        <Flex direction="column" align="center" mx={4}>
          <Text>C1</Text>
          <CircularProgress value={80}>
            <CircularProgressLabel>80%</CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Flex direction="column" align="center" mx={4}>
          <Text>C2</Text>
          <CircularProgress value={30}>
            <CircularProgressLabel>30%</CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Distance = ({
  value,
  increment,
  decrement,
  setValue,
  minDistance,
  maxDistance,
}) => {
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
          min={minDistance}
          max={maxDistance}
          mx={2}
          minW={200}
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

const Attempts = ({ makes, handleChange }) => {
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
