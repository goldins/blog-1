import * as React from 'react';
import speakeasy from 'speakeasy';
import styled, { WithTheme } from '@emotion/styled';

import { Button, H3, P, TextInput } from '../General';
import { Theme } from '../../styles/defaultTheme';
import { ENCODING, STEP } from './lib/consts';

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
  GENERATED
}

const verify = async (secret: string, token: string) => {
  const resp = await fetch('/api/2fa/verify', {
    body: JSON.stringify({ secret, token }),
    method: 'POST'
  });

  const data = await resp.json();
  if (data.error) {
    throw new Error(data.error);
  }
};

const fetchSecret = async (): Promise<string> => {
  const resp = await fetch('/api/2fa/generate');
  const { data } = await resp.json();
  return data;
};

const generateToken = (secret: string) =>
  speakeasy.totp({
    secret,
    step: 0.5,
    digits: 1,
    encoding: ENCODING
  });

export const OneTwoFA = () => {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [codeInput, setCodeInput] = React.useState('');
  const [token, setToken] = React.useState('');
  const [secret, setSecret] = React.useState('');
  const [step, setStep] = React.useState(Step.GENERATE);
  const [intervalTimer, setIntervalTimer] = React.useState(0);

  const generateClick = async () => {
    setStep(Step.GENERATED);
    const data = await fetchSecret();
    setSecret(data);
    setToken(generateToken(data));
    setIntervalTimer(
      window.setInterval(() => {
        const newToken = generateToken(data);
        setToken(newToken);
        setToken(generateToken(data));
      }, STEP * 1000)
    );
  };

  const verifyClick = async () => {
    setError('');
    setSuccess('');
    try {
      await verify(secret, codeInput);
      window.clearInterval(intervalTimer);
      setToken('');
      setIntervalTimer(0);
      setSuccess('Success!');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {step === Step.GENERATE ? (
        <>
          <P>Generate your 2FA token.</P>
          <Button type="button" sz="lg" onClick={generateClick}>
            Generate
          </Button>
        </>
      ) : null}
      {step === Step.GENERATED ? (
        <>
          {token ? (
            <>
              {' '}
              <H3>token: {token}</H3>
              <P>Remember this token. You will need it later.</P>
              <P>Please enter your 2FA token.</P>
              <OneOffTextInput
                autoFocus
                sz="lg"
                onChange={(e) => {
                  setCodeInput(e.currentTarget.value);
                }}
              />
              <br />
              <br />
              <Button type="submit" sz="lg" onClick={verifyClick}>
                Verify
              </Button>
            </>
          ) : null}
        </>
      ) : null}
      {error || success ? <P style={{ color: error ? 'red' : 'green' }}>{error || success}</P> : null}
    </>
  );
};
