import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

export const H2 = styled.h2(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));
