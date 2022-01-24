/** @jsxImportSource @emotion/react */
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Theme } from '@emotion/react';
import { SizeProps } from '../../../styles/defaultTheme';
import styled from '@emotion/styled';
import { StyledLabel } from '../Label';
import * as React from 'react';
import { Grid } from '../Grid';
import { P } from '../Heading';
import { Property } from 'csstype';

interface Props extends InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: ReactNode;
  helpText?: React.ReactNode;
  labelWidth?: Property.Width;
  inputWidth?: Property.Width;
}

const StyledCheckbox = styled('input')(
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

export const CheckboxField = ({
  sz,
  helpText,
  label,
  labelWidth = 'auto',
  inputWidth = 'auto',
  ...rest
}: Props) => {
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
      <StyledCheckbox
        css={{ width: inputWidth, gridArea: 'checkbox' }}
        {...rest}
        sz={sz}
        type={type}
      />
      {helpText ? (
        <P css={{ gridArea: 'helpText', marginBottom: 0 }} sz={lowerSz}>
          {helpText}
        </P>
      ) : null}
    </Grid>
  );
};
