import { useContext } from 'react';
import { Heading, Flex, Text, Button, Code } from '@chakra-ui/react';
import { store } from '../components/context/GlobalProvider';

const Dashboard = () => {
  const { state } = useContext(store);
  return (
    <Flex
      maxWidth="450"
      margin="0 auto"
      direction="column"
      minHeight="400"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading>Dashboard</Heading>
      <Code p="4" m="4" borderRadius="8" textAlign="left">
        {JSON.stringify(state, null, 4)}
      </Code>
    </Flex>
  );
};

export default Dashboard;
