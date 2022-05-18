/** @jsxImportSource @emotion/react */
import type { InputHTMLAttributes, ReactNode } from 'react';
import { StyledLabel } from '../Label';
import { StyledTextAreaInput, StyledTextInput } from './TextInput';
import { SizeProps } from '../../../styles/defaultTheme';
import { Grid } from '../Grid';
import * as React from 'react';
import { P } from '../Heading';
import { Property } from 'csstype';

// FIXME: should be InputHTMLAttributes and TextareaHTMLAttributes
type Both = InputHTMLAttributes<HTMLTextAreaElement | HTMLInputElement>;

interface Props extends Both, SizeProps {
  label?: ReactNode;
  labelEllipsis?: boolean;
  labelWidth?: Property.Width;
  helpText?: ReactNode;
  helpIntent?: 'none' | 'error';
  inputWidth?: Property.Width;
  textArea?: boolean;
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
  textArea = false,
  ...rest
}: Props) => {
  if (!['text', 'number', 'email'].includes(type)) {
    throw new Error(`InvalidArgument: type = ${type}`);
  }

  if (textArea && type !== 'text') {
    throw new Error(`InvalidArgument: type = ${type} when textArea = true`);
  }

  const lowerSz = sz === 'md' ? 'sm' : sz === 'lg' ? 'md' : 'md';

  return (
    <>
      <Grid
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows={`1fr ${textArea ? 'auto' : '1fr'}`}
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
        {textArea ? (
          <StyledTextAreaInput
            // FIXME: replace 36px with theme
            css={{ width: inputWidth, gridArea: 'textInput' }}
            {...rest}
            sz={sz}
          />
        ) : (
          <StyledTextInput
            css={{ width: inputWidth, gridArea: 'textInput' }}
            {...rest}
            sz={sz}
            type={type}
          />
        )}
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
