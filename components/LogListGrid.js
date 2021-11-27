import { useQuery } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { SingleCircle } from 'components/CircleStats';
import LogTable from 'components/LogTable';
import { CIRCLE_RANGES } from 'utils/constants';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const LogListGrid = ({ data, isLoading, error }) => {
  if (isLoading) return <Spinner margin="20px auto" size="xl" />;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box w="100%" overflow="auto" mt="8" mb="20">
      <Accordion allowMultiple transition="0.3s all">
        {data.map((o, i) => {
          return (
            <AccordionItem>
              <AccordionButton
                _expanded={{
                  bg: 'gray.700',
                  color: 'white',
                  borderRadius: '8px 8px 0 0',
                  borderLeft: '1px solid gray.200',
                  borderRight: '1px solid gray.200',
                  transform: 'translateY(10px)',
                }}
              >
                <SimpleGrid
                  columns={4}
                  minChildWidth="50px"
                  alignItems="center"
                  py="4"
                  width="100%"
                >
                  <Box fontSize="sm">{timeAgo.format(new Date(o.date))}</Box>
                  <Box>
                    <CircularProgress value={o.c1Stats.percent}>
                      <CircularProgressLabel>
                        {o.c1Stats.percent}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                  <Box>
                    <CircularProgress value={o.c2Stats.percent}>
                      <CircularProgressLabel>
                        {o.c2Stats.percent}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                  <Box textAlign="left" fontSize="sm">
                    <Text isTruncated>{o.notes}</Text>
                  </Box>
                </SimpleGrid>
                <AccordionIcon maxWidth="50px" />
              </AccordionButton>
              <AccordionPanel
                boxShadow="inner"
                borderRadius="0 0 8px 8px"
                mb="10px"
                border="1px solid var(--chakra-colors-gray-700)"
                position="relative"
              >
                <SimpleGrid
                  columns={2}
                  minChildWidth="280px"
                  spacingX="20px"
                  spacingY="0"
                >
                  <SingleCircle
                    circleStats={o.c1Stats}
                    puttLog={o.puttLog}
                    range={CIRCLE_RANGES.CIRCLE_1}
                  />
                  <SingleCircle
                    circleStats={o.c2Stats}
                    puttLog={o.puttLog}
                    range={CIRCLE_RANGES.CIRCLE_2}
                  />
                  <Box my={8}>
                    <LogTable puttLog={o.puttLog} my={8} />
                  </Box>
                  <Box my={8}>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="gray.700"
                      textTransform="uppercase"
                      textAlign="center"
                      mb="8"
                    >
                      Notes
                    </Text>
                    <Box
                      borderRadius="8"
                      boxShadow="inner"
                      minHeight="200px"
                      p="6"
                      background="gray.50"
                      color="gray.600"
                      textAlign="left"
                      fontSize="sm"
                      maxWidth="350px"
                      margin="0 auto"
                    >
                      {o.notes}
                    </Box>
                  </Box>
                </SimpleGrid>
                <Box
                  w="100%"
                  // background="gray.100"
                  color="gray.500"
                  p="4"
                  zIndex="-1"
                  position="relative"
                >
                  <Text fontSize="sm" fontWeight="light" fontStyle="italic">
                    Completed {new Date(o.date).toLocaleString()}
                  </Text>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default LogListGrid;
