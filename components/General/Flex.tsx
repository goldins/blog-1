import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { SizeProps } from '../../styles/defaultTheme';

interface Props extends InputHTMLAttributes<HTMLDivElement>, SizeProps {
  container?: boolean;
  item?: boolean;
}

export const Flex = styled('div')(({ container = false, item = false }: Props) => ({
  display: container ? 'flex' : 'initial',
  flex: item ? '1 1' : 'initial',
  alignItems: 'center',
}));
