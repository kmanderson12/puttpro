import { connectToDatabase } from '../utils/mongodb';
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
  TableCaption,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Stats } from '../components/PuttLogger';

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
      <LogList puttLogs={props.puttLogs} />
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

const LogList = (props) => (
  <Box maxHeight="500" minW="300" overflow="auto" marginBottom="10">
    <Table variant="simple" my="8">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th textAlign="center">C1</Th>
          <Th textAlign="center">C2</Th>
          <Th>Notes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.puttLogs ? (
          props.puttLogs.map((o, i) => (
            <Tr key={i}>
              <Td>{o?.date}</Td>
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
              <Td fontSize="sm" maxWidth="200px">
                {o.notes}
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

const DataDump = (props) => (
  <>
    <Text mt="4">Test data from MongoDB:</Text>
    <Code p="4" m="4" borderRadius="8" textAlign="left">
      {JSON.stringify(props.puttLogs, null, 4)}
    </Code>
  </>
);

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const puttLogs = await db.collection('putt_logs').find({}).toArray();
  return {
    props: {
      puttLogs: JSON.parse(JSON.stringify(puttLogs)),
    },
  };
}
