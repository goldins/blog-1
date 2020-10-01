import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../components/Container';
import { A, H1, P } from '../../components/General';

export default () => (
  <VerticalContainer>
    <H1>Projects</H1>
    <P>
      <Link href="/projects/bad-ux">
        <A>Bad UX Series</A>
      </Link>
    </P>
    <P>
      <Link href="/projects/do-it-generator">
        <A>&quot;Do it For Her&quot; Generator</A>
      </Link>
    </P>
  </VerticalContainer>
);
