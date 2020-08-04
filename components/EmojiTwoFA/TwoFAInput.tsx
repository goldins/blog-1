import * as React from 'react';
import styled, { WithTheme } from '@emotion/styled';
import { TextField } from '../General/Inputs';
import { Theme } from '../../styles/defaultTheme';

const TwoFATextInput = styled(TextField)(
  {
    fontFamily: 'monospace',
    outline: 'none',
    lineHeight: 1.3,
    border: 'none'
  },
  ({ theme, size }: WithTheme<{ size: number }, Theme>) => ({
    borderBottom: `2px solid ${theme.colors.brand}`,
    borderRadius: 0,
    fontSize: theme.dimensions.fontSize.large * 4,
    width: theme.dimensions.fontSize.large * 4 * size,
    padding: 0,
    textAlign: 'center'
  })
);

export const TwoFAInput = ({
  size,
  onChange
}: {
  size: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return <TwoFATextInput autoFocus sz="lg" onChange={onChange} size={size} />;
};
