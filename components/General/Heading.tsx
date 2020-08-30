import styled, { WithTheme } from '@emotion/styled';
import { SizeProps, Theme } from '../../styles/defaultTheme';

export const H1 = styled.h1(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

export const H2 = styled.h2(({ theme: { colors } }: { theme: Theme }) => ({
  color: colors.accent
}));

type VARIANTS = 'normal' | 'excited' | 'error' | 'warning';

// TODO: generalize
export const H3 = styled.h3(
  ({ theme: { colors }, variant = 'normal' }: { theme: Theme } & { variant?: VARIANTS }) => ({
    color: (() => {
      switch (variant) {
        case 'error':
          return colors.error;
        case 'warning':
          return colors.warning;
        case 'excited':
          return colors.accent;
        default:
          return colors.brand;
      }
    })()
  })
);

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
