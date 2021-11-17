import { Text, Code } from '@chakra-ui/react';

const DataDump = ({ data }) => (
  <>
    <Text mt="4">Data from MongoDB:</Text>
    <Code p="4" m="4" borderRadius="8" textAlign="left" maxWidth="400px">
      {JSON.stringify(data, null, 4)}
    </Code>
  </>
);

export default DataDump;
