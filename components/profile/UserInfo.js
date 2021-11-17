import {
  Avatar,
  Heading,
  Flex,
  IconButton,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UpdateUser from 'components/profile/UpdateUser';

const UserInfo = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderRadius="6" p="6" position="relative">
      <Flex flexDir="row" alignItems="center" justifyContent="space-around">
        <Avatar
          size="2xl"
          boxShadow="base"
          src={user.imageURL}
          border="2px solid var(--chakra-colors-gray-800)"
        />
        <Flex flexDir="column" alignItems="flex-start" marginLeft="4">
          <Heading size="lg" textAlign="left">
            {user.name}
          </Heading>
          <Text>{user.location}</Text>
          <IconButton
            position="absolute"
            bottom="2"
            right="2"
            onClick={onOpen}
            aria-label="Edit profile"
            icon={<EditIcon />}
          />
        </Flex>
      </Flex>
      <UpdateUser user={user} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UserInfo;
