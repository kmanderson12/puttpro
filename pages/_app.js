import App from 'next/app';
import React from 'react';
import Page from '../components/Page';
import { SessionProvider } from 'next-auth/react';
import { DemoProvider } from '../components/context/DemoProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <DemoProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
            <ChakraProvider>
              <Page>
                <Component {...pageProps} />
              </Page>
            </ChakraProvider>
          </SessionProvider>
        </QueryClientProvider>
      </DemoProvider>
    );
  }
}
