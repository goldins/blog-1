import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../components/Container';

export default () => (
  <VerticalContainer>
    Projects
    <br />
    <br />
    <Link href="/projects/bad-keyboard">
      <a>Drag and Drop Keyboard</a>
    </Link>
  </VerticalContainer>
);
