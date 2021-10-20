import { useState, useContext } from 'react';
import router, { useRouter } from 'next/router';
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
import { store, ADD_ITEM } from '../components/context/GlobalProvider';
import {
  calculateMakes,
  calculateAttempts,
  calculatePercent,
} from '../utils/calcFunctions';

export default function PuttLogger(props) {
  const { dispatch } = useContext(store);
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

  const postData = async (data) => {
    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('failed');
    }
  };

  function handleSubmit() {
    const newLog = {
      puttLog,
      notes,
      c1Stats,
      c2Stats,
    };
    console.log(newLog);
    postData(newLog);
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
      <Button onClick={handleSubmit}>Finish Session</Button>
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

const Disc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="37"
    height="42"
    style={{ maxHeight: '22px' }}
    fill="none"
    viewBox="0 0 37 42"
  >
    <path fill="url(#pattern0)" d="M0 0H36.96V42H0z"></path>
    <defs>
      <pattern
        id="pattern0"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use transform="scale(.01136 .01)" xlinkHref="#image0_17:13"></use>
      </pattern>
      <image
        id="image0_17:13"
        width="88"
        height="100"
        xlinkHref="data:image/png;base64,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"
      ></image>
    </defs>
  </svg>
);

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
