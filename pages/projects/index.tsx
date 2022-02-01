import * as React from 'react';
import Link from 'next/link';
import { VerticalContainer } from '../../components/Container';
import { A, H1, P } from '../../components/General';
import { useRouter } from 'next/router';

const Projects = () => {
  const { query } = useRouter();

  const { beta = null } = query;

  return (
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
      <P>
        {beta !== null ? (
          <Link href="/projects/pdf-guard" passHref>
            <A>PDF Guard</A>
          </Link>
        ) : null}
      </P>
    </VerticalContainer>
  );
};

export default Projects;
