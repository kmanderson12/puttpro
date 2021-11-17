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
import { getSession } from 'next-auth/react';

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
  const { isLoading, error, data, isFetching } = useQuery('puttLogs', () =>
    fetch(`/api/logs`).then((res) => res.json())
  );

  if (isLoading) return <Spinner margin="20px auto" size="xl" />;

  if (error) return 'An error has occurred: ' + error.message;
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
          {data.map((o, i) => {
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

const DataDump = (props) => (
  <>
    <Text mt="4">Test data from MongoDB:</Text>
    <Code p="4" m="4" borderRadius="8" textAlign="left">
      {JSON.stringify(props.puttLogs, null, 4)}
    </Code>
  </>
);

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
