export default function SiteMessage() {
  return (
    <Box
      width="100%"
      p="2"
      fontSize={{ base: 'small', md: 'md' }}
      textAlign="center"
      background="gray.200"
    >
      Hey there! 👋 This app is a work in progress. You can check out the code{' '}
      <Link
        isExternal
        color="blue.500"
        href="https://github.com/kmanderson12/puttpro"
      >
        here
      </Link>
      .
    </Box>
  );
}
