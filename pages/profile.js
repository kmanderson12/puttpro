import NextLink from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import {
  Heading,
  Flex,
  Text,
  Button,
  Box,
  Code,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DataDump from 'components/DataDump';

const Profile = (props) => {
  const { isLoading, error, data, isFetching } = useQuery('userData', () =>
    fetch('/api/user').then((res) => res.json())
  );

  if (isLoading) return <Spinner margin="20px auto" size="xl" />;

  if (error) return 'An error has occurred: ' + error.message;

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
        <DataDump data={data} />
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
