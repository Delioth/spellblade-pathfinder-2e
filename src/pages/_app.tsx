import * as React from 'react';
import NextApp from 'next/app';
// @ts-ignore
import { IconButton, ThemeProvider, useColorMode, BaseStyles } from 'theme-ui';
import theme from '../util/theme';

const Switchie = (props) => {
  const [mode, setMode] = useColorMode();
  return (
    <IconButton
      bg="page"
      style={{ position: 'sticky', left: '1rem', bottom: '1rem' }}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
      }}
      aria-label="Toggle dark mode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentcolor"
      >
        <circle
          r={11}
          cx={12}
          cy={12}
          fill="none"
          stroke="currentcolor"
          strokeWidth={2}
        />
      </svg>
    </IconButton>
  );
};

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Switchie />
      </ThemeProvider>
    );
  }
}
