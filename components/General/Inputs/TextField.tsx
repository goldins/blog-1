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
  labelEllipsis?: boolean;
  labelWidth?: Property.Width;
  helpText?: ReactNode;
  helpIntent?: 'none' | 'error';
  inputWidth?: Property.Width;
}

export const TextField = ({
  type = 'text',
  sz,
  helpText,
  label,
  labelEllipsis = false,
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
          <StyledLabel
            css={{
              width: labelWidth,
              gridArea: 'label',
              ...(labelEllipsis
                ? {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }
                : {}),
            }}
            sz={sz}
          >
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
    </>
  );
};
