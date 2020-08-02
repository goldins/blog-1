import styled, { WithTheme } from '@emotion/styled';
import { SizeProps, Theme } from '../../styles/defaultTheme';

export const H1 = styled.h1(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const H2 = styled.h2(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const H3 = styled.h3(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

interface PProps extends React.HTMLAttributes<HTMLParagraphElement>, SizeProps {}

export const P = styled('p')<WithTheme<PProps, Theme>>(({ theme, sz = 'md' }) => ({
  ...(sz === 'sm'
    ? {
        fontSize: theme.dimensions.fontSize.small,
        lineHeight: theme.dimensions.lineHeight.regular
      }
    : sz === 'lg'
    ? {
        fontSize: theme.dimensions.fontSize.large,
        lineHeight: theme.dimensions.lineHeight.regular
      }
    : {
        fontSize: theme.dimensions.fontSize.regular,
        lineHeight: theme.dimensions.lineHeight.regular
      })
}));
