import { Theme } from '@emotion/react';
import facepaint from 'facepaint';

export interface SizeProps {
  sz?: 'sm' | 'md' | 'lg';
}

const colors = {
  brand: '#2c8d72',
  accent: '#ff8a15',
  success: '#37b635',
  error: '#ec1818',
  warning: '#ec7418',
  ui: {
    bright: '#d9d9d9',
    light: '#f5f3f7',
    whisper: '#fbfafc',
  },
  code: '#fcf6f0',
  gray: {
    dark: '#000000EA',
    copy: '#000000E0',
    calm: '#00000089',
  },
  white: '#fff',
  black: '#000',
};

const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",' +
    '"Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace',
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const widths = {
  md: 720,
  lg: 960,
  xl: 1140,
};

const dimensions = {
  fontSize: {
    small: 12,
    regular: 16,
    large: 20,
  },
  headingSizes: {
    h1: 2.441,
    h2: 1.953,
    h3: 1.563,
    h4: 1.25,
  },
  lineHeight: {
    small: 1.2,
    regular: 2,
    large: 2.5,
  },
  containerPadding: 1.5,
  borderRadii: {
    small: 4,
    regular: 6,
    large: 10,
  },
};

const heights = {
  header: 60,
};

const mq = facepaint(Object.values(breakpoints).map((bp) => `@media (min-width: ${bp}px)`));

export const defaultTheme: Theme = {
  colors,
  fonts,
  breakpoints,
  widths,
  dimensions,
  heights,
  mq,
};
