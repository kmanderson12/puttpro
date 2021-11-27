const LogListBasic = (props) => {
  return (
    <Box minW="300" overflow="auto" marginBottom="10">
      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th>Completed</Th>
            <Th textAlign="center">C1</Th>
            <Th textAlign="center">C2</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {puttLogs &&
            puttLogs.map((o, i) => {
              return (
                <Tr key={i}>
                  <Td fontSize="sm">{timeAgo.format(new Date(o.date))}</Td>
                  <Td textAlign="center">
                    <CircularProgress value={o.c1Stats.percent}>
                      <CircularProgressLabel>
                        {o.c1Stats.percent}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Td>
                  <Td textAlign="center">
                    <CircularProgress value={o.c2Stats.percent}>
                      <CircularProgressLabel>
                        {o.c2Stats.percent}%
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Td>
                  <Td fontSize="sm" minWidth="150px" maxWidth="200px">
                    {o.notes}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Box>
  );
};
