/** @jsxImportSource @emotion/react */
import type { InputHTMLAttributes, ReactNode } from 'react';
import { StyledLabel } from '../Label';
import { StyledTextInput } from './TextInput';
import { SizeProps } from '../../../styles/defaultTheme';
import { Grid } from '../Grid';
import * as React from 'react';
import { P } from '../Heading';
import { Property } from 'csstype';

interface Props extends InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: ReactNode;
  helpText?: ReactNode;
  helpIntent?: 'none' | 'error';
  labelWidth?: Property.Width;
  inputWidth?: Property.Width;
}

export const TextField = ({
  type = 'text',
  sz,
  helpText,
  label,
  labelWidth = 'auto',
  inputWidth = 'auto',
  helpIntent = 'none',
  ...rest
}: Props) => {
  if (!['text', 'number', 'email'].includes(type)) {
    throw new Error(`InvalidArgument: type = ${type}`);
  }

  const lowerSz = sz === 'md' ? 'sm' : sz === 'lg' ? 'md' : 'md';

  return (
    <>
      <Grid
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr"
        gridTemplateAreas={`"${label ? 'label' : 'textInput'} textInput" ${
          helpText ? '"helpText helpText"' : ''
        }`}
      >
        {label ? (
          <StyledLabel css={{ width: labelWidth, gridArea: 'label' }} sz={sz}>
            {label}
          </StyledLabel>
        ) : null}
        <StyledTextInput
          css={{ width: inputWidth, gridArea: 'textInput' }}
          {...rest}
          sz={sz}
          type={type}
        />
        {helpText ? (
          <P
            css={{
              gridArea: 'helpText',
              marginBottom: 0,
              ...(helpIntent === 'error' ? { color: 'red' } : {}),
            }}
            sz={lowerSz}
          >
            {helpText}
          </P>
        ) : null}
      </Grid>
    </>
  );
};
