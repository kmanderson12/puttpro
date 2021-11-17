import { getSession } from 'next-auth/react';
import {
  Heading,
  Flex,
  Box,
  Spinner,
  Divider,
  Text,
  Textarea,
  SimpleGrid,
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import UserInfo from 'components/profile/UserInfo';

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
      my="8"
    >
      <Heading mb={8}>Profile</Heading>
      <Box>
        <UserInfo user={data} />
      </Box>
      <Divider my="4" />
      <BioSection />
    </Flex>
  );
};

const BioSection = (props) => {
  return (
    <Flex flexDir="column" textAlign="left">
      <Text mb="8" textAlign="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
        perspiciatis doloribus provident, id voluptatibus mollitia libero
        consequuntur dignissimos consectetur vero, deleniti rerum. Accusamus
        eius quam odit aut commodi dignissimos minima.
      </Text>

      <Table>
        <Tbody>
          <Tr>
            <Th>PDGA#</Th>
            <Th textAlign="right">
              <Editable defaultValue="123456">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Th>
          </Tr>
          <Tr>
            <Th>Putter</Th>
            <Th textAlign="right">
              <Editable defaultValue="DX Aviar">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Th>
          </Tr>
          <Tr>
            <Th>Favorite Course</Th>
            <Th textAlign="right">
              <Editable defaultValue="Cane Creek">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Th>
          </Tr>
          <Tr>
            <Th>Favorite Disc Golfer</Th>
            <Th textAlign="right">
              <Editable defaultValue="Ricky Wysocki">
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Th>
          </Tr>
        </Tbody>
      </Table>
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
