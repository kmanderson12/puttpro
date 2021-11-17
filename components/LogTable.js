import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LogTable = ({ puttLog }) => (
  <Box
    maxHeight="350"
    minW="300"
    maxWidth="350"
    margin="0 auto"
    marginBottom="10"
  >
    <Text
      fontSize="sm"
      fontWeight="semibold"
      color="gray.700"
      textTransform="uppercase"
      textAlign="center"
    >
      Log
    </Text>
    <Table variant="simple" my="8">
      <Thead position="sticky" top="0" background="white">
        <Tr>
          <Th>Distance</Th>
          <Th isNumeric>Makes</Th>
        </Tr>
      </Thead>
      <Tbody>
        {puttLog.length ? (
          puttLog.map((o, i) => (
            <Tr key={i}>
              <Td>{o.distance}ft</Td>
              <Td isNumeric>
                {o.makes}/{o.attempts}
              </Td>
            </Tr>
          ))
        ) : (
          <Tr textAlign="center">
            <Td width="100%">No putts logged yet.</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </Box>
);

export default LogTable;
