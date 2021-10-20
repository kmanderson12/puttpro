import { useContext } from 'react';
import { connectToDatabase } from '../utils/mongodb';
import { Heading, Flex, Text, Button, Code } from '@chakra-ui/react';
import { store } from '../components/context/GlobalProvider';

const Dashboard = (props) => {
  const { state } = useContext(store);
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

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const puttLogs = await db.collection('putt_logs').find({}).toArray();
  return {
    props: {
      puttLogs: JSON.parse(JSON.stringify(puttLogs)),
    },
  };
}
