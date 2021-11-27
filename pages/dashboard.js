import { useQuery } from 'react-query';
import { getSession } from 'next-auth/react';
import { Heading, Flex } from '@chakra-ui/react';
import LogListGrid from 'components/LogListGrid';

const Dashboard = (props) => {
  const { isLoading, error, data, isFetching } = useQuery('puttLogs', () =>
    fetch('/api/logs').then((res) => res.json())
  );
  return (
    <Flex
      margin="0 auto"
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt="8"
    >
      <Heading>Dashboard</Heading>
      {/* <Flex w="100%" justifyContent="flex-end">
        <Box>
          <NextLink href="/new">
            <Button my="4" leftIcon={<AddIcon />}>
              New Putt Log
            </Button>
          </NextLink>
        </Box>
      </Flex> */}
      <LogListGrid data={data} isLoading={isLoading} error={error} />
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

export default Dashboard;
