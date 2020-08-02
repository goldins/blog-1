import styled, { WithTheme } from '@emotion/styled';
import { SizeProps, Theme } from '../../styles/defaultTheme';
interface Props extends React.InputHTMLAttributes<HTMLDivElement>, SizeProps {
  container?: boolean;
  item?: boolean;
}

export const Grid = styled('div')<WithTheme<Props, Theme>>(
  ({ theme, sz = 'md', container = false, item = false }) => ({
    display: container ? 'flex' : 'initial',
    flex: item ? '1 1' : 'initial',
    ...(sz === 'sm'
      ? {
          padding: item ? theme.dimensions.containerPadding * 2 : 0
        }
      : sz === 'lg'
      ? {
          padding: item ? theme.dimensions.containerPadding * 4 : 0
        }
      : {
          padding: item ? theme.dimensions.containerPadding * 6 : 0
        })
  })
);
