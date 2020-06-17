import { Theme } from './defaultTheme';

export default (theme: Theme) => `
  * {
    box-sizing: border-box;
  }

  html {
    font-size: ${theme.dimensions.fontSize.regular}px !important;
    line-height: ${theme.dimensions.lineHeight.regular} !important;
    touch-action: manipulation;
  }

  body {
    padding: 0,
    margin: 0,
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: ${theme.fonts.sansSerif};
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  a {
    color: ${theme.colors.brand};
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${theme.colors.ui.light};
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: 0.25rem 0.5rem;
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-of-type(odd) {
        td {
          background-color: ${theme.colors.ui.whisper};
        }
        tr {
          background-color: ${theme.colors.ui.whisper};
        }
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.414rem;
    margin-bottom: 0.5rem;
    color: ${theme.colors.black};
    font-weight: 600;
    line-height: ${theme.dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${theme.dimensions.headingSizes.h1}rem;
  }

  h2 {
    font-size: ${theme.dimensions.headingSizes.h2}rem;
  }

  h3 {
    font-size: ${theme.dimensions.headingSizes.h3}rem;
  }

  h4,
  h5,
  h6 {
    font-size: ${theme.dimensions.headingSizes.h4}rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  strong {
    color: ${theme.colors.black};
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: 0.5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${theme.colors.ui.light};
  }

  blockquote {
    margin: 0.8rem 0;
    padding: 0.5rem 1rem;
    border-left: 0.25rem solid ${theme.colors.ui.light};
    color: ${theme.colors.gray.calm};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${theme.breakpoints.md / theme.dimensions.fontSize.regular}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`;
