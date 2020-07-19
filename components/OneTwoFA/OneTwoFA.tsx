import * as React from 'react';
import { Button, H3, P, TextInput } from '../General';
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

enum Step {
  GENERATE,
  GENERATED,
  VERIFY
}

export const OneTwoFA = () => {
  const [error, setError] = React.useState('');
  const [codeInput, setCodeInput] = React.useState('');
  const [code, setCode] = React.useState('');
  const [uuid, setUuid] = React.useState('');
  const [step, setStep] = React.useState(Step.GENERATE);

  const toGenerated = async () => {
    setStep(Step.GENERATED);
    const resp = await fetch('/api/2fa/generate');
    const { data, id } = await resp.json();
    setCode(data);
    setUuid(id);
  };

  const toVerify = async () => {
    setStep(Step.VERIFY);
  };

  const verify = async () => {
    setError('');
    try {
      const resp = await fetch('/api/2fa/verify', {
        body: JSON.stringify({ uuid, code: codeInput }),
        method: 'POST'
      });
      const data = await resp.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {step === Step.GENERATE ? (
        <>
          <P>Generate your 2FA code.</P>
          <Button type="button" sz="lg" onClick={toGenerated}>
            Generate
          </Button>
        </>
      ) : null}
      {step === Step.GENERATED ? (
        <>
          <H3>code: {code}</H3>
          <P>Remember this code. You will need it later.</P>
          <Button type="button" sz="lg" onClick={toVerify}>
            Verify
          </Button>
        </>
      ) : null}
      {step === Step.VERIFY ? (
        <>
          <P>Please enter your 2FA code.</P>
          <OneOffTextInput
            autoFocus
            sz="lg"
            onChange={(e) => {
              setCodeInput(e.currentTarget.value);
            }}
            size={1}
            maxLength={1}
          />
          <br />
          <br />
          <Button type="submit" sz="lg" onClick={verify}>
            Verify
          </Button>
        </>
      ) : null}
      {error ? <P>{error}</P> : null}
    </>
  );
};
