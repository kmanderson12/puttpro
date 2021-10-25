import { Button, Text, SimpleGrid, Flex } from '@chakra-ui/react';

const AttemptsGrid = ({ makes, handleChange }) => {
  const attemptsArray = [...Array(10).keys()].map((i) => (i = i + 1));

  return (
    <Flex direction="column" align="center" my={8}>
      <Text
        fontSize="sm"
        color="gray.700"
        fontWeight="semibold"
        textTransform="uppercase"
      >
        Makes
      </Text>
      <Text fontSize="3xl" margin="2">
        {makes}/10
      </Text>
      <SimpleGrid
        columns="5"
        rows="2"
        gap="4"
        bg="gray.100"
        borderRadius="8"
        width="100%"
        p="2"
        my="4"
      >
        {attemptsArray.map((n, i) => (
          <Button
            key={n}
            data-number={n}
            bg={n <= makes ? 'green.200' : 'white'}
            borderRadius="4"
            onClick={handleChange}
            color={n <= makes ? 'green.700' : 'gray.500'}
            _hover={{
              background: `${n <= makes ? 'green.200' : 'white'}`,
            }}
          >
            {n}
          </Button>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default AttemptsGrid;
