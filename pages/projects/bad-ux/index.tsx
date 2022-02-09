import * as React from 'react';
import Link from 'next/link';
import { A, Beta, H1, P, VerticalContainer } from '../../../components';

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
    <Beta>
      <P>
        <Link href="/projects/bad-ux/tbd" passHref>
          <A>tbd</A>
        </Link>
      </P>
    </Beta>
  </VerticalContainer>
);

export default BadUx;
