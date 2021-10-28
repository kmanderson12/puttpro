import App from 'next/app';
import React from 'react';
import Page from '../components/Page';
import { UserProvider } from '@auth0/nextjs-auth0';
import { GlobalProvider } from '../components/context/GlobalProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserProvider>
        <GlobalProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider>
              <Page>
                <Component {...pageProps} />
              </Page>
            </ChakraProvider>
          </QueryClientProvider>
        </GlobalProvider>
      </UserProvider>
    );
  }
}
