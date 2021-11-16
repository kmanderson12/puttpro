import NextLink from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, Flex, Heading, Link, Button } from '@chakra-ui/react';

const Header = () => {
  const { data: session, status } = useSession();
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
            <NextLink href="/dashboard">
              <Link mx={{ base: '2', md: '6' }}>Dashboard</Link>
            </NextLink>
            <Button onClick={() => signOut()} mx={{ base: '2', md: '6' }}>
              Sign Out
            </Button>
            <NextLink href="/profile">
              <Link ml={{ base: '2', md: '6' }}>
                <Avatar bg="blue.500" />
              </Link>
            </NextLink>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
