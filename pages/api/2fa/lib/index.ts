import { generateToken } from '../../../shared/2fa';

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
  return generateToken(secret) === token;
};
