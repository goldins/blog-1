/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Link from 'next/link';
import { A, H1, P, Beta, VerticalContainer } from '../../components';

const Projects = () => (
  <VerticalContainer>
    <H1>Projects</H1>
    <P>
      <Link href="/projects/bad-ux" passHref>
        <A>Bad UX Series</A>
      </Link>
    </P>
    <P>
      <Link href="/projects/do-it-generator" passHref>
        <A>&quot;Do it For Her&quot; Generator</A>
      </Link>
    </P>
    <Beta>
      <P>
        <Link href="/projects/resume" passHref>
          <A>PDF Guard</A>
        </Link>
      </P>
    </Beta>
  </VerticalContainer>
);

export default Projects;
