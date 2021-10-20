import { Heading, Flex, Text, Button } from '@chakra-ui/react';

const Index = () => (
  <Flex
    maxWidth="450"
    margin="0 auto"
    direction="column"
    align="center"
    minHeight="400"
    justifyContent="center"
    textAlign="center"
  >
    <Heading>Practice makes progress.</Heading>
    <Text>Practice your disc golf putting. Track your growth over time.</Text>
    <Flex>
      <Button size="lg" m="4">
        Log In
      </Button>
      <Button colorScheme="blue" size="lg" m="4">
        Sign Up
      </Button>
    </Flex>
  </Flex>
);

export default Index;
