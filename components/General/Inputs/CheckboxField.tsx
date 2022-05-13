import type { InputHTMLAttributes, ReactNode } from 'react';
import { Theme } from '@emotion/react';
import { SizeProps } from '../../../styles/defaultTheme';
import styled from '@emotion/styled';
import { StyledLabel } from '../Label';
import * as React from 'react';
import { Grid } from '../Grid';
import { P } from '../Heading';
import { Property } from 'csstype';
import { forwardRef } from 'react';
import { grayscale } from 'polished';

const StyledCheckbox = styled('input')(({ theme, sz = 'md' }: { theme: Theme } & Props) => ({
  ...(sz === 'sm'
    ? {
        borderRadius: theme.dimensions.borderRadii.small,
        height: theme.dimensions.fontSize.small,
        width: theme.dimensions.fontSize.small,
        '::before': {
          height: Math.ceil(theme.dimensions.fontSize.small * 0.5),
          width: Math.ceil(theme.dimensions.fontSize.small * 0.5),
        },
      }
    : sz === 'lg'
    ? {
        borderRadius: theme.dimensions.borderRadii.small,
        height: theme.dimensions.fontSize.large,
        width: theme.dimensions.fontSize.large,
        '::before': {
          height: Math.ceil(theme.dimensions.fontSize.large * 0.5),
          width: Math.ceil(theme.dimensions.fontSize.large * 0.5),
        },
      }
    : {
        borderRadius: theme.dimensions.borderRadii.small,
        height: theme.dimensions.fontSize.regular,
        width: theme.dimensions.fontSize.regular,
        '::before': {
          height: Math.ceil(theme.dimensions.fontSize.regular * 0.5),
          width: Math.ceil(theme.dimensions.fontSize.regular * 0.5),
        },
      }),
  display: 'grid',
  placeContent: 'center',
  appearance: 'none',
  backgroundColor: theme.colors.white,
  margin: 0,
  font: 'inherit',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: theme.colors.ui.bright,
  '&:focus': {
    outline: 'none',
    borderColor: theme.colors.accent,
  },
  '&:not(:readonly)': {
    cursor: 'pointer',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
  '&::before': {
    content: '""',
    transform: 'scale(0)',
    transition: '120ms transform ease-in-out',
    boxShadow: `inset 1em 1em ${theme.colors.accent}`,
  },
  '&:checked::before': {
    transform: 'scale(1)',
  },
  ':disabled::before': {
    boxShadow: `inset 1em 1em ${grayscale(theme.colors.accent)}`,
  },
  '&[readonly]:focus': {
    borderColor: theme.colors.ui.bright,
  },
  '&[readonly]::before': {
    boxShadow: `inset 1em 1em ${grayscale(theme.colors.accent)}`,
  },
}));

interface Props extends InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: ReactNode;
  helpText?: React.ReactNode;
  helpIntent?: 'none' | 'error';
  labelWidth?: Property.Width;
}

export const CheckboxField = forwardRef<HTMLInputElement, Props>(
  ({ sz, helpText, helpIntent = 'none', label, labelWidth = 'auto', ...rest }, ref) => {
    const type = 'checkbox';
    const lowerSz = sz === 'md' ? 'sm' : sz === 'lg' ? 'md' : 'md';

    return (
      <Grid
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr"
        gridTemplateAreas={`"${label ? 'label' : 'checkbox'} checkbox" ${
          helpText ? '"helpText helpText"' : ''
        }`}
      >
        {label ? (
          <StyledLabel css={{ width: labelWidth, gridArea: 'label' }} sz={sz}>
            {label}
          </StyledLabel>
        ) : null}
        <StyledCheckbox css={{ gridArea: 'checkbox' }} ref={ref} {...rest} sz={sz} type={type} />
        {helpText ? (
          <P
            css={({ colors }) => ({
              gridArea: 'helpText',
              marginBottom: 0,
              ...(helpIntent === 'error' ? { color: colors.error } : {}),
            })}
            sz={lowerSz}
          >
            {helpText}
          </P>
        ) : null}
      </Grid>
    );
  }
);
