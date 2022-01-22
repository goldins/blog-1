import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { SizeProps } from '../../styles/defaultTheme';
import { Theme } from '@emotion/react';

interface Props extends InputHTMLAttributes<HTMLDivElement>, SizeProps {
  container?: boolean;
  item?: boolean;
}

export const Grid = styled('div')(
  ({ theme, sz = 'md', container = false, item = false }: { theme: Theme } & Props) => ({
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
