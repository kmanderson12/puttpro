import { useState } from 'react';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Thead,
  Tbody,
  TableCaption,
  Tfoot,
  Tr,
  Th,
  Td,
  Textarea,
} from '@chakra-ui/react';
import {
  calculateMakes,
  calculateAttempts,
  calculatePercent,
} from '../utils/calcFunctions';
import Disc from './icons/Disc';

export default function PuttLogger(props) {
  const [distance, setDistance] = useState(15);
  const [makes, setMakes] = useState(0);
  const [puttLog, setPuttLog] = useState([]);
  const [notes, setNotes] = useState('');
  const [c1Stats, setC1Stats] = useState({
    makes: 0,
    attempts: 0,
    percent: 0,
  });
  const [c2Stats, setC2Stats] = useState({
    makes: 0,
    attempts: 0,
    percent: 0,
  });

  let handleNotesChange = (e) => {
    let inputValue = e.target.value;
    setNotes(inputValue);
  };

  const minDistance = 10;
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

  function setCircleStats(distance, makes) {
    distance <= 33
      ? setC1Stats({
          makes: calculateMakes(c1Stats.makes, makes),
          attempts: calculateAttempts(c1Stats.attempts),
          percent: calculatePercent(c1Stats.makes, makes, c1Stats.attempts),
        })
      : setC2Stats({
          makes: calculateMakes(c2Stats.makes, makes),
          attempts: calculateAttempts(c2Stats.attempts),
          percent: calculatePercent(c2Stats.makes, makes, c2Stats.attempts),
        });
  }

  function logPutts() {
    const newPuttLog = {
      distance,
      makes: parseFloat(makes),
      attempts: 10,
    };
    setPuttLog([...puttLog, newPuttLog]);
    setMakes(0);
    setCircleStats(distance, makes);
  }

  const newLogMutation = (data) => {
    return fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(newLogMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('puttLogs');
    },
  });

  function handleSubmit() {
    const date = new Date().toISOString();
    const newLog = {
      date,
      puttLog,
      notes,
      c1Stats,
      c2Stats,
    };
    mutation.mutate(newLog);
    router.push('/dashboard');
  }

  return (
    <Flex
      direction="column"
      align="center"
      margin="0 auto"
      mt="8"
      pb="10"
      maxW="400"
    >
      <Heading mb="8">New Putt Log</Heading>
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
      <Log puttLog={puttLog} />
      <Stats c1Stats={c1Stats} c2Stats={c2Stats} />
      <Notes notes={notes} handleInputChange={handleNotesChange} />
      <Button
        colorScheme="blue"
        isLoading={mutation.isLoading}
        disabled={puttLog.length === 0}
        onClick={handleSubmit}
      >
        Finish Session
      </Button>
    </Flex>
  );
}

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
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color="gray.700"
        textTransform="uppercase"
      >
        Distance
      </Text>
      <Text fontSize="3xl" margin="2">
        {value}ft
      </Text>
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
          <SliderThumb boxSize={6}>
            <Box as={Disc} />
          </SliderThumb>
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
      <Text
        fontSize="sm"
        color="gray.700"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        Makes
      </Text>
      <Text fontSize="3xl" margin="2">
        {makes}/10
      </Text>
      <SimpleGrid
        columns="5"
        rows="2"
        gap="4"
        bg="gray.100"
        borderRadius="8"
        width="100%"
        p="2"
        my="4"
      >
        {attemptsArray.map((n, i) => (
          <Button
            key={n}
            data-number={n}
            bg={n <= makes ? 'green.200' : 'white'}
            borderRadius="4"
            onClick={handleChange}
            color={n <= makes ? 'green.700' : 'gray.500'}
            _hover={{
              background: `${n <= makes ? 'green.200' : 'white'}`,
            }}
          >
            {n}
          </Button>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

const Log = ({ puttLog }) => (
  <Box maxHeight="350" minW="300" overflow="auto" marginBottom="10">
    <Table variant="simple" my="8">
      <Thead position="sticky" top="0" background="white">
        <Tr>
          <Th>Distance</Th>
          <Th isNumeric>Makes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {puttLog.length ? (
          puttLog.map((o, i) => (
            <Tr key={i}>
              <Td>{o.distance}ft</Td>
              <Td isNumeric>
                {o.makes}/{o.attempts}
              </Td>
            </Tr>
          ))
        ) : (
          <Tr textAlign="center">
            <Td width="100%">No putts logged yet.</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </Box>
);

const Stats = ({ c1Stats, c2Stats }) => (
  <Flex>
    <Flex direction="column" align="center" mx={4}>
      <Text>C1</Text>
      <CircularProgress value={c1Stats.percent} size="120">
        <CircularProgressLabel>{c1Stats.percent}%</CircularProgressLabel>
      </CircularProgress>
    </Flex>
    <Flex direction="column" align="center" mx={4}>
      <Text>C2</Text>
      <CircularProgress value={c2Stats.percent} size="120">
        <CircularProgressLabel>{c2Stats.percent}%</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  </Flex>
);

const Notes = ({ notes, handleInputChange }) => {
  return (
    <Box m={8} width="100%">
      <Text
        fontSize="sm"
        color="gray.700"
        fontWeight="semibold"
        textTransform="uppercase"
        textAlign="center"
      >
        Notes
      </Text>
      <Textarea
        value={notes}
        onChange={handleInputChange}
        placeholder="What worked? What didn't work? Write anything you'd like future you to remember."
        size="sm"
        borderRadius={8}
        my="4"
      />
    </Box>
  );
};

export { Stats };
