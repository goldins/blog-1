import * as React from 'react';

import { Button, H3, P } from '../General';

import { STEP } from '../../lib/2fa/consts';

import { generateToken } from '../../lib/2fa';
import { TwoFAInput } from './TwoFAInput';

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

const getToken = (secret: string) => {
  const now = Date.now();
  const counter = Math.floor(now / STEP / 1000);
  return generateToken(secret, counter);
};

const fetchSecret = async (): Promise<string> => {
  const resp = await fetch('/api/2fa/generate');
  const { data } = await resp.json();
  return data;
};

export const OneTwoFA = () => {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [codeInput, setCodeInput] = React.useState('');
  const [token, setToken] = React.useState('');
  const [secret, setSecret] = React.useState('');
  const [step, setStep] = React.useState(Step.GENERATE);

  const generateClick = async () => {
    setStep(Step.GENERATED);
    const data = await fetchSecret();
    setSecret(data);
    setToken(getToken(data));
    window.setInterval(() => {
      const newToken = getToken(data);
      setToken(newToken);
    }, STEP * 1000);
  };

  const verifyClick = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    setSuccess('');
    try {
      await verify(secret, codeInput);
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
        <form onSubmit={verifyClick}>
          {token ? (
            <>
              {' '}
              <H3>token: {token}</H3>
              <P>Pretend this token is in your 2FA Application.</P>
              <P>Please enter your token.</P>
              <TwoFAInput
                size={1}
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
        </form>
      ) : null}
      {error || success ? <P style={{ color: error ? 'red' : 'green' }}>{error || success}</P> : null}
    </>
  );
};
