import Link from 'next/link';
import * as React from 'react';
import { VerticalContainer } from '../../components/Container';
import { A, H1, P } from '../../components/General';

const Blog = () => (
  <VerticalContainer>
    <H1>Blog</H1>
    <br />
    <P>
      I don’t currently publish anything here, but I have a few articles on{' '}
      <Link passHref href="https://dev.to/goldins">
        <A target="_blank" rel="nofollow noreferrer">
          dev.to
        </A>
      </Link>
      .
    </P>
  </VerticalContainer>
);

export default Blog;
