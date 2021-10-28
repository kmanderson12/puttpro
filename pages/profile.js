import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Heading, Flex, Text, Button, Box, Code } from '@chakra-ui/react';

const Profile = (props) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <Flex
      maxWidth="450"
      margin="0 auto"
      direction="column"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading mb={8}>Profile Coming Soon</Heading>
      <Box>
        <NextLink href="/new">
          <Button colorScheme="blue">View the Demo</Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Profile;
