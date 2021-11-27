import { useContext } from 'react';
import { store } from 'components/context/DemoProvider';
import { Heading, Flex, Tag, Box, VStack } from '@chakra-ui/react';
import LogListGrid from 'components/LogListGrid';

const Dashboard = (props) => {
  const { state } = useContext(store);
  const puttLogs = state.items.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <Flex
      margin="0 auto"
      direction="column"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <VStack>
        <Heading>Dashboard</Heading>
        <Tag size="sm" colorScheme="blue">
          Demo
        </Tag>
      </VStack>
      <LogListGrid data={puttLogs} isLoading={false} error={null} />
    </Flex>
  );
};

export default Dashboard;
