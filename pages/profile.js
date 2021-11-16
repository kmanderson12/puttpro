import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Heading, Flex, Text, Button, Box, Code } from '@chakra-ui/react';

const Profile = (props) => {
  return (
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

export default Profile;
