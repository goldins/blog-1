import * as React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Container } from '../components/Container';
import { defaultTheme } from '../styles/defaultTheme';
import normalize from '../styles/normalize';
import { SiteHead } from '../components/SiteHead';

import { polyfill } from 'mobile-drag-drop';
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';

import 'mobile-drag-drop/default.css';

interface AppProps {
  Component: () => React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: Record<string, any>;
}

export default ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    polyfill({ dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride });
  }, []);
  return (
    <Container>
      <SiteHead />

      <ThemeProvider theme={defaultTheme}>
        <Global styles={normalize(defaultTheme)} />
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
};
