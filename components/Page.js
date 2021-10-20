import { Box } from '@chakra-ui/layout';
import { Component } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        <Box margin="0 auto" maxWidth="800" p="2">
          {this.props.children}
        </Box>
      </>
    );
  }
}

export default Page;
