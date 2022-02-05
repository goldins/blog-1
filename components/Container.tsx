import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Section = styled.section(() => ({
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const Container = (props: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Section>
      <main>{props.children}</main>
    </Section>
  );
};

export const VerticalContainer = styled.div({
  minHeight: '100vh',
  padding: '0 0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});
