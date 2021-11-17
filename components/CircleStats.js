import {
  Box,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { CIRCLE_RANGES, circleRange } from 'utils/constants';
import { calculateRangeStats } from 'utils/calcFunctions';

const CircleStats = ({ c1Stats, c2Stats, puttLog, flexDir = 'column' }) => {
  return (
    <Flex direction={flexDir} align="center" w="100%" flexWrap="wrap">
      <SingleCircle
        circleStats={c1Stats}
        puttLog={puttLog}
        range={CIRCLE_RANGES.CIRCLE_1}
      />
      <SingleCircle
        circleStats={c2Stats}
        puttLog={puttLog}
        range={CIRCLE_RANGES.CIRCLE_2}
      />
    </Flex>
  );
};

const SingleCircle = ({ circleStats, puttLog, range }) => {
  let circleStatObj = {};
  const circleOnly = circleRange.filter(
    (i) => i.min >= range.min && i.max <= range.max
  );

  circleOnly.map((item, idx) => {
    let newArr = puttLog.filter(
      (log) => log.distance > item.min && log.distance <= item.max
    );
    if (newArr.length > 0) {
      let statObj = calculateRangeStats(newArr);
      statObj.percent = (statObj.totalMakes / statObj.totalAttempts) * 100 || 0;
      statObj.text = `${statObj.totalMakes}/${statObj.totalAttempts}`;
      circleStatObj[`${item.range}Stats`] = statObj;
    }
  });

  const short = circleStatObj[`${range.name.toLowerCase()}ShortStats`];
  const medium = circleStatObj[`${range.name.toLowerCase()}MediumStats`];
  const long = circleStatObj[`${range.name.toLowerCase()}LongStats`];

  return (
    <Flex direction="column" my={8} alignItems="center">
      <Text
        fontSize="sm"
        color="gray.700"
        fontWeight="semibold"
        textTransform="uppercase"
        textAlign="center"
      >
        {range.name} Stats
      </Text>
      <Flex
        alignItems="center"
        marginTop="8"
        marginBottom="4"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Box>
          <CircularProgress value={circleStats.percent} size="120">
            <CircularProgressLabel>
              {circleStats.percent}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Flex direction="column">
          <Flex minW="200px" justifyContent="space-between">
            <Text fontWeight="bold" color="gray.700">
              Short
            </Text>
            <Text>{short?.text || '0/0'}</Text>
          </Flex>
          <Progress mb="4" value={short?.percent || 0} />
          <Flex minW="150px" justifyContent="space-between">
            <Text fontWeight="bold" color="gray.700">
              Medium
            </Text>
            <Text>{medium?.text || '0/0'}</Text>
          </Flex>
          <Progress mb="4" value={medium?.percent || 0} />
          <Flex minW="150px" justifyContent="space-between">
            <Text fontWeight="bold" color="gray.700">
              Long
            </Text>
            <Text>{long?.text || '0/0'}</Text>
          </Flex>
          <Progress mb="4" value={long?.percent || 0} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CircleStats;
export { SingleCircle };
