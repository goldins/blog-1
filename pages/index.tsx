import * as React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { H1, A, P } from '../components/General';

const Container = styled.div(() => ({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
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
        <A>Blog</A>
      </Link>
      <Link href="/projects">
        <A>Projects</A>
      </Link>

      <Footer>
        <P>Footer</P>
      </Footer>
    </Container>
  );
};
