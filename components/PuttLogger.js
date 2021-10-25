import { useState } from 'react';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Box,
  Progress,
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
import next from 'next';

export default function PuttLogger(props) {
  // TODO: Clean up state. Create a total object.
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
    let newValue =
      distance - 5 < minDistance ? minDistance : roundByFive(distance - 5);
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
      <Button size="lg" disabled={makes === 0} onClick={logPutts} mb="8">
        Log Putts
      </Button>
      <Stats c1Stats={c1Stats} c2Stats={c2Stats} puttLog={puttLog} />
      <Log puttLog={puttLog} />
      <Notes notes={notes} handleInputChange={handleNotesChange} />
      <Button
        colorScheme="blue"
        size="lg"
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
    <Text
      fontSize="sm"
      fontWeight="semibold"
      color="gray.700"
      textTransform="uppercase"
      textAlign="center"
    >
      Log
    </Text>
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

const Stats = ({ c1Stats, c2Stats, puttLog }) => {
  const c1Short = puttLog.filter((i) => i.distance <= 11);
  const c1Medium = puttLog.filter((i) => i.distance <= 22 && i.distance > 11);
  const c1Long = puttLog.filter((i) => i.distance <= 33 && i.distance > 22);

  const c2Short = puttLog.filter((i) => i.distance <= 44 && i.distance > 33);
  const c2Medium = puttLog.filter((i) => i.distance <= 55 && i.distance > 44);
  const c2Long = puttLog.filter((i) => i.distance <= 66 && i.distance > 55);

  function calculateRangeStats(obj) {
    const totalMakes = obj.reduce((total, next) => total + next.makes, 0);
    const totalAttempts = obj.reduce((total, next) => total + next.attempts, 0);
    return {
      totalMakes,
      totalAttempts,
    };
  }

  const c1ShortStats = calculateRangeStats(c1Short);
  const c1MediumStats = calculateRangeStats(c1Medium);
  const c1LongStats = calculateRangeStats(c1Long);

  const c2ShortStats = calculateRangeStats(c2Short);
  const c2MediumStats = calculateRangeStats(c2Medium);
  const c2LongStats = calculateRangeStats(c2Long);

  return (
    <Flex direction="column" align="center">
      <Flex direction="column" mx={4} minWidth="300px" my={8}>
        <Text
          fontSize="sm"
          color="gray.700"
          fontWeight="semibold"
          textTransform="uppercase"
          textAlign="center"
        >
          C1 Stats
        </Text>
        <Flex align="center" marginY="4">
          <Box>
            <CircularProgress value={c1Stats.percent} size="120">
              <CircularProgressLabel>{c1Stats.percent}%</CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Flex direction="column" marginLeft="20px">
            <Flex minW="200px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Short
              </Text>
              <Text>
                {c1ShortStats.totalMakes}/{c1ShortStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c1ShortStats.totalMakes / c1ShortStats.totalAttempts) * 100 ||
                0
              }
            />
            <Flex minW="150px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Medium
              </Text>
              <Text>
                {c1MediumStats.totalMakes}/{c1MediumStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c1MediumStats.totalMakes / c1MediumStats.totalAttempts) *
                  100 || 0
              }
            />
            <Flex minW="150px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Long
              </Text>
              <Text>
                {c1LongStats.totalMakes}/{c1LongStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c1LongStats.totalMakes / c1LongStats.totalAttempts) * 100 || 0
              }
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" mx={4} minWidth="300px" my={8}>
        <Text
          fontSize="sm"
          color="gray.700"
          fontWeight="semibold"
          textTransform="uppercase"
          textAlign="center"
        >
          C2 Stats
        </Text>
        <Flex align="center" marginY="4">
          <Box>
            <CircularProgress value={c2Stats.percent} size="120">
              <CircularProgressLabel>{c2Stats.percent}%</CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Flex direction="column" marginLeft="20px">
            <Flex minW="200px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Short
              </Text>
              <Text>
                {c2ShortStats.totalMakes}/{c2ShortStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c2ShortStats.totalMakes / c2ShortStats.totalAttempts) * 100 ||
                0
              }
            />
            <Flex minW="150px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Medium
              </Text>
              <Text>
                {c2MediumStats.totalMakes}/{c2MediumStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c2MediumStats.totalMakes / c2MediumStats.totalAttempts) *
                  100 || 0
              }
            />
            <Flex minW="150px" justifyContent="space-between">
              <Text fontWeight="bold" color="gray.700">
                Long
              </Text>
              <Text>
                {c2LongStats.totalMakes}/{c2LongStats.totalAttempts}
              </Text>
            </Flex>
            <Progress
              mb="4"
              value={
                (c2LongStats.totalMakes / c2LongStats.totalAttempts) * 100 || 0
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

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
