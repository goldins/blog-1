import * as React from 'react';

import { Button, H3, P } from '../General';

import { STEP } from '../../pages/shared/2fa/consts';

import { generateToken } from '../../pages/shared/2fa';
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

const getToken = (secret: string) => generateToken(secret);

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
  const [intervalTimer, setIntervalTimer] = React.useState(0);

  const generateClick = async () => {
    setStep(Step.GENERATED);
    const data = await fetchSecret();
    setSecret(data);
    setToken(getToken(data));
    setIntervalTimer(
      window.setInterval(() => {
        const newToken = getToken(data);
        setToken(newToken);
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
        </>
      ) : null}
      {error || success ? <P style={{ color: error ? 'red' : 'green' }}>{error || success}</P> : null}
    </>
  );
};
