/** @jsxImportSource @emotion/react */
import { LabelHTMLAttributes } from 'react';
import { Theme } from '@emotion/react';
import { SizeProps } from '../../styles/defaultTheme';
import styled from '@emotion/styled';

interface Props extends LabelHTMLAttributes<HTMLLabelElement>, SizeProps {}

export const StyledLabel = styled('label')(({ theme, sz = 'md' }: { theme: Theme } & Props) => ({
  ...(sz === 'sm'
    ? {
        fontSize: theme.dimensions.fontSize.small,
        lineHeight: theme.dimensions.lineHeight.regular,
      }
    : sz === 'lg'
    ? {
        fontSize: theme.dimensions.fontSize.large,
        lineHeight: theme.dimensions.lineHeight.regular,
      }
    : {
        fontSize: theme.dimensions.fontSize.regular,
        lineHeight: theme.dimensions.lineHeight.regular,
      }),
}));
