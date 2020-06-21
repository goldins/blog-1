import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

export const H2 = styled.h2(({ theme: { colors, breakpoints } }: { theme: Theme }) => ({
  color: colors.accent,
  fontSize: `2rem`,
  [`@media(max-width: ${breakpoints.sm}px)`]: {
    fontSize: `1.5rem`
  }
}));
