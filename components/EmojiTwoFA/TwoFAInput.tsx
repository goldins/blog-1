import type { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import { TextField } from '../General/Inputs';

const TwoFATextInput = styled(TextField)(
  {
    fontFamily: 'monospace',
    outline: 'none',
    lineHeight: 1.3,
    border: 'none'
  },
  ({ theme, size }: { theme: Theme } & { size: number }) => ({
    borderBottom: `2px solid ${theme.colors.brand}`,
    borderRadius: 0,
    fontSize: theme.dimensions.fontSize.large * 4,
    width: theme.dimensions.fontSize.large * 4 * size,
    padding: 0,
    textAlign: 'center'
  })
);

export const TwoFAInput = (props: {
  size: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
}) => <TwoFATextInput autoFocus sz="lg" {...props} />;
