import * as React from 'react';

import { Button, H3, P, TextField } from '../General';

import { TIME_STEP, TIME_WINDOW } from '../../lib/2fa/consts';

import { generateToken } from '../../lib/2fa';
import { TwoFAInput } from './TwoFAInput';

enum Step {
  GENERATE,
  GENERATED
}

const verify = async (secret: string, token: string, timeStep: number, timeWindow: number) => {
  const resp = await fetch('/api/2fa/verify', {
    body: JSON.stringify({ secret, token, timeStep, timeWindow }),
    method: 'POST'
  });

  const data = await resp.json();
  if (data.error) {
    throw new Error(data.error);
  }
};

const getToken = (secret: string, timeStep: number) => {
  const now = Date.now();
  const counter = Math.floor(now / timeStep / 1000);
  return generateToken(secret, counter);
};

const fetchSecret = async (): Promise<string> => {
  const resp = await fetch('/api/2fa/generate');
  const { data } = await resp.json();
  return data;
};

export const EmojiTwoFA = () => {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [codeInput, setCodeInput] = React.useState('');
  const [token, setToken] = React.useState('');
  const [secret, setSecret] = React.useState('');
  const [step, setStep] = React.useState(Step.GENERATE);
  const [timeStep, setTimeStep] = React.useState(TIME_STEP);
  const [timeWindow, setTimeWindow] = React.useState(TIME_WINDOW);

  const submitGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchSecret();
    setSecret(data);
    setToken(getToken(data, timeStep));
    setStep(Step.GENERATED);
    window.setInterval(() => {
      const newToken = getToken(data, timeStep);
      setToken(newToken);
    }, timeStep * 1000);
  };

  const verifyClick = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    setSuccess('');
    try {
      await verify(secret, codeInput, timeStep, timeWindow);
      setSuccess('Success!');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {step === Step.GENERATE ? (
        <form onSubmit={submitGenerate}>
          <P>Generate your 2FA token.</P>
          <TextField
            label="Step (s)"
            helpText={<P sz="sm">Token is valid for this many seconds.</P>}
            sz="md"
            type="number"
            step={0.1}
            min={0}
            value={timeStep}
            onChange={(evt) => setTimeStep(+evt.currentTarget.value)}
          />
          <br />
          <TextField
            label="Window"
            helpText={
              <P sz="sm">
                History of tokens to accept.
                <br />
                The default value of 2 means that the latest and previous tokens will both be valid.
              </P>
            }
            sz="md"
            type="number"
            onChange={(evt) => setTimeWindow(+evt.currentTarget.value)}
            value={timeWindow}
          />
          <br />
          <Button type="submit" sz="lg">
            Generate
          </Button>
        </form>
      ) : null}
      {step === Step.GENERATED ? (
        <form onSubmit={verifyClick}>
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
        </form>
      ) : null}
      {error || success ? (
        <P style={{ color: error ? 'red' : 'green' }}>{error || success}</P>
      ) : null}
    </>
  );
};
