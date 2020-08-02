import * as React from 'react';

import { Button, H3, P, TextField } from '../General';

import { TIME_STEP, TIME_WINDOW } from '../../lib/2fa/consts';

import { generateToken } from '../../lib/2fa';
import { TwoFAInput } from './TwoFAInput';

enum Step {
  GENERATE,
  GENERATED
}

const verify = async (secret: string, token: string, timeStep: number) => {
  const resp = await fetch('/api/2fa/verify', {
    body: JSON.stringify({ secret, token, timeStep }),
    method: 'POST'
  });

  const data = await resp.json();
  if (data.error) {
    throw new Error(data.error);
  }
};

const getToken = (secret: string, timeStep: number) => {
  const now = Date.now();
  const counter = Math.floor(now / (timeStep || TIME_STEP) / 1000);
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
  const [timeStep, setTimeStep] = React.useState(TIME_STEP);

  const generateClick = async () => {
    setStep(Step.GENERATED);
    const data = await fetchSecret();
    setSecret(data);
    setToken(getToken(data, timeStep));
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
      await verify(secret, codeInput, timeStep);
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
          <TextField
            label="Step (s)"
            helpText={<P sz="sm">Token is valid for this many seconds.</P>}
            sz="md"
            type="number"
            min={0}
            step={1}
            value={timeStep}
            onChange={(evt) => setTimeStep(+evt.currentTarget.value)}
          />
          <br />
          <TextField
            label="Window"
            helpText={
              <P sz="sm">
                Number of previous tokens to accept.
                <br />
                Not (yet) configurable.
              </P>
            }
            sz="md"
            type="number"
            disabled
            value={TIME_WINDOW}
          />
          <br />
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
      {error || success ? (
        <P style={{ color: error ? 'red' : 'green' }}>{error || success}</P>
      ) : null}
    </>
  );
};
