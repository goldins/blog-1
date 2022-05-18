/** @jsxImportSource @emotion/react */
import type { ButtonHTMLAttributes } from 'react';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { lighten } from 'polished';
import { SizeProps } from '../../../styles/defaultTheme';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, SizeProps {}

export const Button = styled('button')(
  {
    letterSpacing: 2,
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
  },
  ({ theme, sz = 'md' }: { theme: Theme } & Props) => ({
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
          padding: '4px 12px',
        }
      : {
          fontSize: theme.dimensions.fontSize.regular,
          lineHeight: theme.dimensions.lineHeight.regular,
          borderRadius: theme.dimensions.borderRadii.regular,
        }),
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: lighten(0.55, theme.colors.brand),
      color: theme.colors.gray.calm,
    },
    backgroundColor: lighten(0.15, theme.colors.brand),
    color: theme.colors.gray.copy,
    '&:hover:not(:disabled)': {
      color: theme.colors.gray.calm,
      backgroundColor: lighten(0.2, theme.colors.brand),
    },
    '&:focus-visible': {
      outlineColor: theme.colors.black,
      outlineWidth: 1,
      outlineStyle: 'solid',
    },
    '&:active:not(:disabled)': {
      color: lighten(0.2, theme.colors.gray.calm),
      backgroundColor: lighten(0.3, theme.colors.brand),
    },
  })
);
