import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../components/Container';
import { A, H1, P } from '../../components/General';

export default () => (
  <VerticalContainer>
    <H1>Projects</H1>
    <P>
      <Link href="/projects/bad-keyboard">
        <A>Drag and Drop Keyboard</A>
      </Link>
    </P>
    <P>
      <Link href="/projects/one-2fa">
        <A>Single-Digit 2FA</A>
      </Link>
    </P>
  </VerticalContainer>
);
