import styled, { WithTheme } from '@emotion/styled';
import { darken } from 'polished';
import { SizeProps, Theme } from '../../../styles/defaultTheme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, SizeProps {}

export const Button = styled('button')<WithTheme<Props, Theme>>(
  {
    letterSpacing: 2,
    cursor: 'pointer',
    outline: 'none',
    border: 'none'
  },
  ({ theme, sz = 'md', disabled = false }) => ({
    ...(sz === 'sm'
      ? {
          fontSize: theme.dimensions.fontSize.small,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.small
        }
      : sz === 'lg'
      ? {
          fontSize: theme.dimensions.fontSize.large,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.large
        }
      : {
          fontSize: theme.dimensions.fontSize.regular,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.regular
        }),
    backgroundColor: theme.colors.brand,
    [`${disabled ? '' : '&:hover'}`]: {
      backgroundColor: darken(0.1, theme.colors.brand)
    },
    [`${disabled ? '' : '&:active'}`]: {
      backgroundColor: darken(0.15, theme.colors.brand)
    }
  })
);
