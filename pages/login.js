import NextLink from 'next/link';
import { Heading, Flex, Text, Button, Box, Code } from '@chakra-ui/react';

const Login = (props) => {
  return (
    <Flex
      maxWidth="450"
      margin="0 auto"
      direction="column"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading mb={8}>Login Coming Soon</Heading>
      <Box>
        <NextLink href="/new">
          <Button colorScheme="blue">Go To Demo</Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Login;
