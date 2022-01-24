import type { InputHTMLAttributes } from 'react';
import { Theme } from '@emotion/react';
import { SizeProps } from '../../../styles/defaultTheme';
import styled from '@emotion/styled';

interface Props extends InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: React.ReactNode;
}

export const StyledTextInput = styled('input')(
  ({ theme: { colors } }) => ({
    letterSpacing: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.brand,
    '&:focus': {
      outline: 'none',
      borderColor: colors.accent,
    },
    padding: `0 .25em`,
  }),
  ({ theme, sz = 'md', disabled = false }: { theme: Theme } & Props) => ({
    ...(sz === 'sm'
      ? {
          fontSize: theme.dimensions.fontSize.small,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.small,
        }
      : sz === 'lg'
      ? {
          fontSize: theme.dimensions.fontSize.large,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.large,
        }
      : {
          fontSize: theme.dimensions.fontSize.regular,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.regular,
        }),
    borderColor: theme.colors.ui.bright,
    cursor: disabled ? 'not-allowed' : 'initial',
  })
);
