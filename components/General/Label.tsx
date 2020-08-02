import { SizeProps, Theme } from '../../styles/defaultTheme';
import styled, { WithTheme } from '@emotion/styled';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>, SizeProps {}

export const StyledLabel = styled('label')<WithTheme<Props, Theme>>(
  {
    padding: `0 .25em`
  },
  ({ theme, sz = 'md' }) => ({
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
        }),
    borderColor: theme.colors.ui.bright
  })
);
