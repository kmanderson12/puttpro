import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useQuery } from 'react-query';
import {
  Avatar,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const Header = () => {
  const { data: session, status } = useSession();
  const { isLoading, error, data, isFetching } = useQuery('userData', () =>
    fetch('/api/user').then((res) => res.json())
  );

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Flex
      as="header"
      maxWidth="1220"
      width="100%"
      margin="0 auto"
      p="8"
      align="center"
      justifyContent="space-between"
    >
      <NextLink href="/">
        <Link>
          <Heading>PuttPro</Heading>
        </Link>
      </NextLink>
      <Flex align="center">
        {!session && (
          <>
            <NextLink href="/new">
              <Link mx={{ base: '2', md: '6' }}>Demo</Link>
            </NextLink>
            <NextLink href="/profile">
              <Link ml={{ base: '2', md: '6' }}>
                <Avatar bg="blue.500" />
              </Link>
            </NextLink>
          </>
        )}
        {session && (
          <>
            <Menu>
              <MenuButton>
                <Avatar
                  bg="blue.500"
                  size="lg"
                  boxShadow="md"
                  border="2px solid var(--chakra-colors-gray-800)"
                  src={data?.imageURL || ''}
                />
              </MenuButton>
              <MenuList>
                <NextLink href="/profile">
                  <MenuItem>Profile</MenuItem>
                </NextLink>
                <NextLink href="/dashboard">
                  <MenuItem>Dashboard</MenuItem>
                </NextLink>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
