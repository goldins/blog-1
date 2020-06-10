import * as React from 'react';
import styled from '@emotion/styled';

const Section = styled.section(() => ({
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const Container = (props: React.PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Section>
      <main>{props.children}</main>
    </Section>
  );
};

const VerticalSection = styled(Section)`
  min-height: 100vh;
`;

export const VerticalContainer = (props: React.PropsWithChildren<Record<string, unknown>>) => (
  <VerticalSection>
    <main>{props.children}</main>
  </VerticalSection>
);
