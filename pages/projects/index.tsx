import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../components/Container';
import { A, H1 } from '../../components/General';

export default () => (
  <VerticalContainer>
    <H1>Projects</H1>
    <br />
    <br />
    <Link href="/projects/bad-keyboard">
      <A>Drag and Drop Keyboard</A>
    </Link>
  </VerticalContainer>
);
