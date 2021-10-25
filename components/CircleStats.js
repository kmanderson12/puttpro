import {
  Box,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
} from '@chakra-ui/react';

const CircleStats = ({ c1Stats, c2Stats, puttLog }) => {
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

export default CircleStats;
