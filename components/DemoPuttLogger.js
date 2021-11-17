import { useState, useContext } from 'react';
import { store, ADD_ITEM } from 'components/context/DemoProvider';
import router from 'next/router';
import { Button, Box, Text, Heading, Flex, Textarea } from '@chakra-ui/react';
import {
  calculateMakes,
  calculateAttempts,
  calculatePercent,
} from '../utils/calcFunctions';
import DistanceSlider from './DistanceSlider';
import CircleStats from './CircleStats';
import AttemptsGrid from './AttemptsGrid';
import LogTable from './LogTable';

export default function PuttLogger(props) {
  const { dispatch, state } = useContext(store);

  const [loading, setLoading] = useState(false);

  // TODO: Clean up state. Refactor functions.
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

  function handleSubmit() {
    setLoading(true);
    const date = new Date().toISOString();
    const newLog = {
      id: state.items.length + 1,
      date,
      puttLog,
      notes,
      c1Stats,
      c2Stats,
    };
    dispatch({ type: ADD_ITEM, payload: newLog });
    router.push('/demo/dashboard');
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
      <DistanceSlider
        value={distance}
        increment={increment}
        decrement={decrement}
        setValue={setDistance}
        minDistance={minDistance}
        maxDistance={maxDistance}
      />
      <AttemptsGrid makes={makes} handleChange={handleAttemptsChange} />
      <Button size="lg" disabled={makes === 0} onClick={logPutts} mb="8">
        Log Putts
      </Button>
      <CircleStats c1Stats={c1Stats} c2Stats={c2Stats} puttLog={puttLog} />
      <LogTable puttLog={puttLog} />
      <Notes notes={notes} handleInputChange={handleNotesChange} />
      <Button
        colorScheme="blue"
        size="lg"
        isLoading={loading}
        disabled={puttLog.length === 0}
        onClick={handleSubmit}
      >
        Finish Session
      </Button>
    </Flex>
  );
}

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
