import * as React from 'react';
import Head from 'next/head';

const NAME = 'Simon Goldin';

export const SiteHead = ({ subTitle }: { subTitle?: string }) => {
  const title = `${NAME}${subTitle ? ` | ${subTitle}` : ''}`;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
