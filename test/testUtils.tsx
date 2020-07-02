import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '../styles/defaultTheme';
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
};

const customRender = (ui: React.ReactElement, options = {}) => render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
