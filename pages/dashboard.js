import { connectToDatabase } from '../utils/mongodb';
import { Heading, Flex, Text, Stack, Box, Code } from '@chakra-ui/react';
import { Stats } from '../components/PuttLogger';

const Dashboard = (props) => {
  return (
    <Flex
      maxWidth="450"
      margin="0 auto"
      direction="column"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading>Dashboard</Heading>
      <Text mt="4">Test data from MongoDB:</Text>
      <Code p="4" m="4" borderRadius="8" textAlign="left">
        {JSON.stringify(props.puttLogs, null, 4)}
      </Code>
    </Flex>
  );
};

export default Dashboard;

const PuttLogCards = (props) => (
  <Stack spacing="8">
    {props.puttLogs &&
      props.puttLogs.map((o, i) => (
        <Box boxShadow="md" p="8" borderRadius="8">
          <Stats c1Stats={o.c1Stats} c2Stats={o.c2Stats} notes={o.notes} />
        </Box>
      ))}
  </Stack>
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
