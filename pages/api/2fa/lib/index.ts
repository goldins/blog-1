import { generateToken } from '../../../../lib/2fa';
import { STEP, WINDOW } from '../../../../lib/2fa/consts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { randomBytes } = require('crypto');

const SET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()<>?/[]{},.:;';
const SET_SIZE = SET.length;

export const generateSecret = () => {
  const bytes = randomBytes(1);

  let output = '';
  for (let i = 0, l = bytes.length; i < l; i++) {
    output += SET[Math.floor((bytes[i] / 255.0) * (SET_SIZE - 1))];
  }

  return output;
};

export const verify = (secret: string, token: string) => {
  for (let i = 0; i < WINDOW; ++i) {
    const now = Date.now();
    const counter = Math.floor(now / STEP / 1000);
    const actual = generateToken(secret, counter - i);
    if (actual === token) {
      return true;
    }
  }
  return false;
};
