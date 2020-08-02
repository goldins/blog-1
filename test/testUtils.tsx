import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '../styles/defaultTheme';

const Providers = ({ children }: React.PropsWithChildren<unknown>): React.ReactElement => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
