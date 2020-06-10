import * as React from 'react';
import Head from 'next/head';

const NAME = 'Simon Goldin';

export const SiteHead = ({ subTitle }: { subTitle?: string }) => {
  const title = `${NAME}${subTitle ? ` | ${subTitle}` : ''}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
