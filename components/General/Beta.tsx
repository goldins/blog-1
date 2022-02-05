import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

export const Beta = ({ children }: PropsWithChildren<Record<never, never>>) => {
  const { query } = useRouter();
  const showBeta = Object.prototype.hasOwnProperty.call(query, 'beta');

  return <>{showBeta ? children : null}</>;
};
