import App from 'next/app';
import React from 'react';
import Page from '../components/Page';
import { GlobalProvider } from '../components/context/GlobalProvider';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <GlobalProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </GlobalProvider>
    );
  }
}
