import { useQuery } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Button,
  Flex,
  Text,
  Stack,
  VStack,
  Box,
  Code,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import CircleStats from '../components/CircleStats';
import LogTable from '../components/LogTable';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Dashboard = (props) => {
  return (
    <Flex
      margin="0 auto"
      direction="column"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading>Dashboard</Heading>
      <LogListGrid />
    </Flex>
  );
};

export default Dashboard;

const PuttLogCards = (props) => (
  <Stack spacing="8">
    {props.puttLogs &&
      props.puttLogs.map((o, i) => (
        <Box boxShadow="md" p="8" borderRadius="8">
          <Flex>
            <VStack>
              <Flex direction="column" align="center" mx={4}>
                <Text>C1</Text>
                <CircularProgress value={o.c1Stats.percent}>
                  <CircularProgressLabel>
                    {o.c1Stats.percent}%
                  </CircularProgressLabel>
                </CircularProgress>
                {o.c1Stats.makes}/{o.c1Stats.attempts}
              </Flex>
            </VStack>
          </Flex>
        </Box>
      ))}
  </Stack>
);

const LogListGrid = (props) => {
  const { isLoading, error, data, isFetching } = useQuery('puttLogs', () =>
    fetch('/api/logs').then((res) => res.json())
  );

  if (isLoading) return <Spinner margin="20px auto" size="xl" />;

  if (error) return 'An error has occurred: ' + error.message;

  const c1Totals = {
    makes: 0,
    attempts: 0,
    percent: 0,
  };

  data.reduce((current, next) => {
    console.log({ current, next });
    let makes = current + next.c1Stats.makes;

    c1Totals.makes = makes;
    return makes;
  }, 0);

  console.log(c1Totals);

  return (
    <Box minW="300" overflow="auto" mt="8" mb="20">
      {/* <SimpleGrid columns={4} mt="8">
        <Text>Completed</Text>
        <Text textAlign="center">C1</Text>
        <Text textAlign="center">C2</Text>
        <Text>Notes</Text>
      </SimpleGrid> */}
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
                <SimpleGrid columns={4} alignItems="center" py="4" width="100%">
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
                    {o.notes}
                  </Box>
                </SimpleGrid>
                <AccordionIcon maxWidth="50px" />
              </AccordionButton>
              <AccordionPanel
                boxShadow="inner"
                borderRadius="0 0 8px 8px"
                mb="10px"
                border="1px solid var(--chakra-colors-gray-700)"
              >
                <Flex wrap="wrap" justifyContent="space-around">
                  <CircleStats
                    c1Stats={o.c1Stats}
                    c2Stats={o.c2Stats}
                    puttLog={o.puttLog}
                    flexDir="row"
                  />
                  <Box my={8}>
                    <LogTable puttLog={o.puttLog} my={8} />
                  </Box>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

const LogList = (props) => {
  const { isLoading, error, data, isFetching } = useQuery('puttLogs', () =>
    fetch('/api/logs').then((res) => res.json())
  );

  if (isLoading) return <Spinner margin="20px auto" size="xl" />;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box minW="300" overflow="auto" marginBottom="10">
      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Completed</Th>
            <Th textAlign="center">C1</Th>
            <Th textAlign="center">C2</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((o, i) => {
            return (
              <Tr key={i}>
                <Td>
                  <Button size="xs">View</Button>
                </Td>
                <Td fontSize="sm">{timeAgo.format(new Date(o.date))}</Td>
                <Td textAlign="center">
                  <CircularProgress value={o.c1Stats.percent}>
                    <CircularProgressLabel>
                      {o.c1Stats.percent}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Td>
                <Td textAlign="center">
                  <CircularProgress value={o.c2Stats.percent}>
                    <CircularProgressLabel>
                      {o.c2Stats.percent}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Td>
                <Td fontSize="sm" minWidth="150px" maxWidth="200px">
                  {o.notes}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const DataDump = (props) => (
  <>
    <Text mt="4">Test data from MongoDB:</Text>
    <Code p="4" m="4" borderRadius="8" textAlign="left">
      {JSON.stringify(props.puttLogs, null, 4)}
    </Code>
  </>
);
