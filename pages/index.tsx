import * as React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div(() => ({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& a': {
    color: '#0070F3',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      textDecoration: 'underline'
    }
  }
}));

const H1 = styled.h1(() => ({
  margin: 0,
  lineHeight: 1.15,
  fontSize: '4rem'
}));

const Footer = styled.footer(() => ({
  width: '100%',
  height: 100,
  borderTop: '1px solid #EAEAEA',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default () => {
  return (
    <Container>
      <main>
        <H1>Simon.Goldin</H1>
      </main>

      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/projects">
        <a>Projects</a>
      </Link>

      <Footer>Footer</Footer>
    </Container>
  );
};
