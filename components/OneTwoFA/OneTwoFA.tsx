import * as React from 'react';
import { Button, P, TextInput } from '../General';
import styled, { WithTheme } from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

export const OneOffTextInput = styled(TextInput)(
  {
    fontFamily: 'monospace',
    outline: 'none',
    lineHeight: 1.3,
    border: 'none'
  },
  ({ theme }: WithTheme<unknown, Theme>) => ({
    borderBottom: `2px solid ${theme.colors.brand}`,
    borderRadius: 0,
    fontSize: theme.dimensions.fontSize.large * 4,
    width: theme.dimensions.fontSize.large * 4,
    padding: 0,
    textAlign: 'center'
  })
);

export const OneTwoFA = () => {
  return (
    <>
      <P>Please enter your 2FA code.</P>
      <OneOffTextInput sz="lg" size={1} maxLength={1} />
      <br />
      <br />
      <Button type="submit" sz="lg">
        Verify
      </Button>
    </>
  );
};
