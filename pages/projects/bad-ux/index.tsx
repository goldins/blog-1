import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../../components/Container';
import { A, H1, P } from '../../../components/General';

export default () => (
  <VerticalContainer>
    <H1>Projects</H1>
    <P>
      <Link href="/projects/bad-ux/bad-keyboard">
        <A>Drag and Drop Keyboard</A>
      </Link>
    </P>
    <P>
      <Link href="/projects/bad-ux/e2fa">
        <A>2🤬A</A>
      </Link>
    </P>
  </VerticalContainer>
);
