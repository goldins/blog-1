import type { InputHTMLAttributes } from 'react';
import { Theme } from '@emotion/react';
import { SizeProps } from '../../../styles/defaultTheme';
import styled from '@emotion/styled';

interface Props extends InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: React.ReactNode;
}

const commonStyles = ({ theme: { colors } }: { theme: Theme }) => ({
  letterSpacing: 1,
  borderStyle: 'solid',
  borderWidth: 2,
  '&:focus': {
    outline: 'none',
    borderColor: colors.accent,
  },
  padding: `0 .25em`,
});

const sizeStyles = ({ theme, sz = 'md' }: { theme: Theme } & Props) => ({
  ...(sz === 'sm'
    ? {
        fontSize: theme.dimensions.fontSize.small,
        lineHeight: theme.dimensions.lineHeight.regular,
        borderRadius: theme.dimensions.borderRadii.small,
        minHeight: theme.dimensions.fontSize.small * theme.dimensions.lineHeight.regular,
      }
    : sz === 'lg'
    ? {
        fontSize: theme.dimensions.fontSize.large,
        lineHeight: theme.dimensions.lineHeight.regular,
        borderRadius: theme.dimensions.borderRadii.large,
        minHeight: theme.dimensions.fontSize.large * theme.dimensions.lineHeight.regular,
      }
    : {
        fontSize: theme.dimensions.fontSize.regular,
        lineHeight: theme.dimensions.lineHeight.regular,
        borderRadius: theme.dimensions.borderRadii.regular,
        minHeight: theme.dimensions.fontSize.regular * theme.dimensions.lineHeight.regular,
      }),
  borderColor: theme.colors.ui.bright,
  '&[readonly]:focus': {
    borderColor: theme.colors.ui.bright,
  },
  ':not(:disabled)': {
    cursor: 'initial',
  },
});

export const StyledTextInput = styled('input')(commonStyles, sizeStyles);

export const StyledTextAreaInput = styled('textarea')(commonStyles, sizeStyles);
