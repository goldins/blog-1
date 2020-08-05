import { generateToken } from '../../../../lib/2fa';
import { TIME_STEP, TIME_WINDOW } from '../../../../lib/2fa/consts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { randomBytes } = require('crypto');

const SET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()<>?/[]{},.:;';
const SET_SIZE = SET.length;

export const generateSecret = () =>
  Array.from<number>(randomBytes(100))
    .map((byte) => SET[Math.floor((byte / 0xff) * (SET_SIZE - 1))])
    .join('');

export const verify = (
  secret: string,
  token: string,
  timeStep = TIME_STEP,
  timeWindow = TIME_WINDOW
) => {
  for (let i = 0; i < timeWindow; ++i) {
    const now = Date.now();
    const counter = Math.floor(now / timeStep / 1000);
    const actual = generateToken(secret, counter - i);
    if (actual === token) {
      return true;
    }
  }
  return false;
};
