import { useQuery } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import {
  Heading,
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
} from '@chakra-ui/react';
import { useContext } from 'react';
import { store } from 'components/context/DemoProvider';

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
      <LogList props={props} />
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

const LogList = (props) => {
  const { state } = useContext(store);
  const puttLogs = state.items.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <Box minW="300" overflow="auto" marginBottom="10">
      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th>Completed</Th>
            <Th textAlign="center">C1</Th>
            <Th textAlign="center">C2</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {puttLogs &&
            puttLogs.map((o, i) => {
              return (
                <Tr key={i}>
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
