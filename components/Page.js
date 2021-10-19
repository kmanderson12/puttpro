import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
  colors: {
    blue300: '#668892',
    blue400: '#62858F',
    blue500: '#56767E',
    gray100: '#F7FAFC',
    gray200: '#EDF2F7',
    gray300: '#E2E8F0',
    gray400: '#CBD5E0',
    gray500: '#A0AEC0',
    gray600: '#718096',
    gray700: '#4A5568',
    gray800: '#2D3748',
    gray900: '#1A202C',
    green100: '#9AE6B4',
    green200: '#68D391',
    red: '#FC8181',
  },
  shadows: {
    inset: 'inset 0px 2px 4px rgba(0, 0, 0, 0.06)',
    bs1: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    bs2: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  radius: {
    br1: '5px',
  },
  bg: '#FFFFFF',
};

const StyledPage = styled.div`
  color: ${(props) => props.theme.colors.gray900};
  background: ${(props) => props.theme.bg};
  min-height: 100vh;
`;

const Inner = styled.div`
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
        font-family: "Roboto", Helvetica, Arial, Sans-Serif;
        @media screen and (max-width: 500px) {
          font-size: 12px;
        }
        @media screen and (max-width: 375px) {
          font-size: 10px;
        }
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        width: 100%;
        min-height: 100vh;
        color: '${(props) => props.theme.colors.gray800}';
    }
    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.gray900};
    }
    h1,h2,h3,h4,h5,p {
      margin: 0;
    }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledPage id="page-wrap">
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
