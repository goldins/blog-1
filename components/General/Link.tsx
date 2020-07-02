import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

export const A = styled.a(({ theme }: { theme: Theme }) => ({
  color: theme.colors.brand,
  cursor: 'pointer'
}));
