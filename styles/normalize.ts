import { Theme } from './defaultTheme';
import { CSSObject } from '@emotion/serialize';

export default (theme: Theme): CSSObject => ({
  '*': {
    borderSizing: 'border-box'
  },
  html: {
    fontSize: `${theme.dimensions.fontSize.regular}px`,
    lineHeight: theme.dimensions.lineHeight.regular,
    backgroundColor: theme.colors.gray.dark,
    touchAction: 'manipulation'
  },
  body: {
    padding: 0,
    margin: 0,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    color: theme.colors.ui.light,
    fontFamily: theme.fonts.sansSerif,
    fontSize: theme.dimensions.fontSize.regular
  },
  a: {
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      textDecoration: 'underline'
    }
  },
  img: {
    maxWidth: '100%',
    objectFit: 'contain',
    position: 'relative'
  },
  figure: {
    margin: '2rem 0'
  },
  figcaption: {
    fontSize: '80%'
  },
  table: {
    width: '100%',
    marginBottom: '1rem',
    border: `1px solid ${theme.colors.ui.light}`,
    fontSize: '85%',
    borderCollapse: 'collapse'
  },
  'td, th': {
    padding: '0.25rem 0.5rem'
  },
  th: {
    textAlign: 'left'
  },
  tbody: {
    tr: {
      '&:nth-of-type(odd)': {
        td: {
          backgroundColor: theme.colors.ui.whisper
        },
        tr: {
          backgroundColor: theme.colors.ui.whisper
        }
      }
    }
  },
  'h1, h2, h3, h4, h5, h6': {
    marginTop: '1.414rem',
    marginBottom: '0.5rem',
    color: theme.colors.black,
    fontWeight: 600,
    lineHeight: theme.dimensions.lineHeight.heading,
    textRendering: 'optimizeLegibility'
  },
  h1: {
    marginTop: 0,
    fontSize: `${theme.dimensions.headingSizes.h1}rem`
  },
  h2: {
    fontSize: `${theme.dimensions.headingSizes.h2}rem`
  },
  h3: {
    fontSize: `${theme.dimensions.headingSizes.h3}rem`
  },
  'h4, h5, h6': {
    fontSize: `${theme.dimensions.headingSizes.h4}rem`
  },
  p: {
    fontSize: `${theme.dimensions.fontSize.regular}px`,
    marginTop: 0,
    marginBottom: '1rem'
  },
  strong: {
    color: theme.colors.black
  },
  'ul, ol, dl': {
    marginTop: 0,
    marginBottom: '1rem'
  },

  dt: {
    fontWeight: 'bold'
  },
  dd: {
    marginBottom: '0.5rem'
  },
  hr: {
    position: 'relative',
    margin: `1.5rem 0`,
    border: 0,
    borderTop: `1px solid ${theme.colors.ui.light}`
  },
  blockquote: {
    margin: `0.8rem 0`,
    padding: `0.5rem 1rem`,
    borderLeft: `0.25rem solid ${theme.colors.ui.light}`,
    color: theme.colors.gray.calm,
    p: {
      '&:last-child': {
        marginBottom: 0
      }
    },
    [`@media (min-width: ${theme.breakpoints.md / theme.dimensions.fontSize.regular}em)`]: {
      paddingRight: '5rem',
      paddingLeft: '1.25rem'
    }
  }
});

/*`

`;*/
