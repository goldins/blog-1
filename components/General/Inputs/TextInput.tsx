import { SizeProps, Theme } from '../../../styles/defaultTheme';
import styled, { WithTheme } from '@emotion/styled';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: React.ReactNode;
}

export const StyledTextInput = styled('input')<WithTheme<Props, Theme>>(
  {
    letterSpacing: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    '&:focus': {
      outline: 'none'
    },
    padding: `0 .25em`
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
    borderColor: theme.colors.ui.bright,
    cursor: disabled ? 'not-allowed' : 'initial'
  })
);
