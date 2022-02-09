import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../../components/Container';
import { A, H1, P } from '../../../components/General';

const BadUx = () => (
  <VerticalContainer>
    <H1>Bad UX Series</H1>
    <P>
      <Link href="/projects/bad-ux/bad-keyboard" passHref>
        <A>Drag and Drop Keyboard</A>
      </Link>
    </P>
    <P>
      <Link href="/projects/bad-ux/e2fa" passHref>
        <A>2🤬A</A>
      </Link>
    </P>
  </VerticalContainer>
);

export default BadUx;
