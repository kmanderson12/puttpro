import { Heading, Flex, Text, Button, Link } from '@chakra-ui/react';
import router from 'next/router';
import NextLink from 'next/link';

const Index = () => (
  <Flex
    maxWidth="500"
    margin="0 auto"
    mt="20"
    direction="column"
    align="center"
    justifyContent="center"
    textAlign="center"
  >
    <Heading size="3xl" mb="4">
      Make your practice perfect.
    </Heading>
    <Text maxW="400">
      Log your putting sessions. Take notes to remember your form. Track your
      progress over time.
    </Text>
    <Flex>
      <NextLink href="/login">
        <Button size="lg" m="4">
          Log In
        </Button>
      </NextLink>
      <NextLink href="/new">
        <Button colorScheme="blue" size="lg" m="4">
          Demo
        </Button>
      </NextLink>
    </Flex>
  </Flex>
);

export default Index;
