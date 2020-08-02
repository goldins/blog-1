import * as React from 'react';
import { StyledLabel } from '../Label';
import { StyledTextInput } from './TextInput';
import { SizeProps } from '../../../styles/defaultTheme';
import { Grid } from '../Grid';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, SizeProps {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
}

export const TextField = ({ type = 'text', sz, helpText, label, ...rest }: Props) => {
  if (!['text', 'number'].includes(type)) {
    throw new Error(`InvalidArgument: type = ${type}`);
  }

  const lowerSz = sz === 'md' ? 'sm' : sz === 'lg' ? 'md' : 'md';

  return (
    <>
      <Grid container sz={lowerSz}>
        {label ? (
          <Grid item sz={lowerSz}>
            <StyledLabel sz={sz}>{label}</StyledLabel>
          </Grid>
        ) : null}
        <Grid item sz={lowerSz}>
          <StyledTextInput {...rest} sz={sz} type={type} />
        </Grid>
      </Grid>
      {helpText ? (
        <Grid container sz={lowerSz}>
          <Grid item sz={lowerSz}>
            {helpText}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};
