import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

export const H1 = styled.h1(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const H2 = styled.h2(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const H3 = styled.h3(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const P = styled.p();
