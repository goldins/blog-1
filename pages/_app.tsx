import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { Container } from '../components/Container';
import { defaultTheme } from '../styles/defaultTheme';

interface AppProps {
  Component: () => React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: Record<string, any>;
}

export default ({ Component, pageProps }: AppProps) => {
  return (
    <Container>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
};
