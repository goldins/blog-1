import * as React from 'react';
import Link from 'next/link';
import { H1, A, P } from '../components/General';
import { VerticalContainer } from '../components/Container';
import { Footer } from '../components/General/Footer';

const EASTER = false;

const Pages = () => {
  return (
    <VerticalContainer>
      <main>
        <H1>Simon.Goldin</H1>
      </main>

      <P>
        <Link href="/blog" passHref>
          <A>Blog</A>
        </Link>
      </P>
      <P>
        <Link href="/projects" passHref>
          <A>Projects</A>
        </Link>
      </P>
      <Footer>{`Copyright ©${
        EASTER ? '1988 - ' : ''
      }${new Date().getFullYear()} | Simon Goldin`}</Footer>
    </VerticalContainer>
  );
};

export default Pages;
