import NextLink from 'next/link';
import { Avatar, Flex, Box, Heading, Text, Link } from '@chakra-ui/react';

const Header = () => (
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
      <NextLink href="#">
        <Link mx={{ base: '2', md: '6' }}>Dashboard</Link>
      </NextLink>
      <NextLink href="/new">
        <Link mx={{ base: '2', md: '6' }}>New</Link>
      </NextLink>
      <NextLink href="#">
        <Link ml={{ base: '2', md: '6' }}>
          <Avatar bg="blue.500" />
        </Link>
      </NextLink>
      {/* <NextLink href="#">
        <Link mx={{ base: '2', md: '6' }}>Profile</Link>
      </NextLink> */}
    </Flex>
  </Flex>
);

export default Header;
